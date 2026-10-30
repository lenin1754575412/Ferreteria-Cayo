const express = require("express");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");

const app = express();
const PORT = 4000;
const SECRET_FILE = path.join(__dirname, ".secret");
const DB_FILE = path.join(__dirname, "usuarios.json");

if (!fs.existsSync(SECRET_FILE)) {
  fs.writeFileSync(SECRET_FILE, crypto.randomBytes(48).toString("hex"), {mode: 0o600});
}
const SECRET = fs.readFileSync(SECRET_FILE, "utf8").trim();

if (!fs.existsSync(DB_FILE)) {
  fs.writeFileSync(DB_FILE, "[]", "utf8");
}

function readUsers() {
  return JSON.parse(fs.readFileSync(DB_FILE, "utf8"));
}
function saveUsers(users) {
  const temp = DB_FILE + ".tmp";
  fs.writeFileSync(temp, JSON.stringify(users, null, 2));
  fs.renameSync(temp, DB_FILE);
}
function publicUser(u) {
  return {id:u.id, nombre:u.nombre, email:u.email, rol:u.rol};
}

app.disable("x-powered-by");
app.use(helmet({contentSecurityPolicy:false}));
app.use(express.json({limit:"20kb"}));

const limiter = rateLimit({
  windowMs:15*60*1000,
  limit:100,
  standardHeaders:"draft-8",
  legacyHeaders:false
});
const authLimiter = rateLimit({
  windowMs:15*60*1000,
  limit:10,
  standardHeaders:"draft-8",
  legacyHeaders:false,
  message:{error:"Demasiados intentos. Espera 15 minutos."}
});
app.use("/api", limiter);

function autenticar(req,res,next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";
  if (!token) return res.status(401).json({error:"Debes iniciar sesión"});
  try {
    const data = jwt.verify(token,SECRET,{algorithms:["HS256"]});
    const user = readUsers().find(u=>u.id===data.id);
    if (!user) return res.status(401).json({error:"Sesión inválida"});
    req.user = user;
    next();
  } catch {
    res.status(401).json({error:"Token inválido o vencido"});
  }
}

function permitir(...roles) {
  return (req,res,next)=>{
    if (!roles.includes(req.user.rol)) {
      return res.status(403).json({error:"No tienes permisos para esta acción"});
    }
    next();
  };
}

app.post("/api/registro",authLimiter,async(req,res)=>{
  const {nombre,email,password} = req.body || {};
  if(typeof nombre!=="string" || nombre.trim().length<3 || nombre.length>80)
    return res.status(400).json({error:"Nombre inválido"});
  if(typeof email!=="string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length>254)
    return res.status(400).json({error:"Correo inválido"});
  if(typeof password!=="string" || password.length<10 || password.length>72)
    return res.status(400).json({error:"La contraseña debe tener entre 10 y 72 caracteres"});

  const users=readUsers();
  const correo=email.toLowerCase().trim();
  if(users.some(u=>u.email===correo))
    return res.status(409).json({error:"El correo ya está registrado"});

  const user={
    id:crypto.randomUUID(),
    nombre:nombre.trim(),
    email:correo,
    password:await bcrypt.hash(password,12),
    rol:"CLIENTE"
  };
  users.push(user);
  saveUsers(users);
  res.status(201).json({mensaje:"Usuario registrado",usuario:publicUser(user)});
});

app.post("/api/login",authLimiter,async(req,res)=>{
  const {email,password}=req.body || {};
  if(typeof email!=="string" || typeof password!=="string")
    return res.status(400).json({error:"Datos inválidos"});

  const user=readUsers().find(u=>u.email===email.toLowerCase().trim());
  const valido=user ? await bcrypt.compare(password,user.password) : false;
  if(!valido)
    return res.status(401).json({error:"Correo o contraseña incorrectos"});

  const token=jwt.sign({id:user.id},SECRET,{algorithm:"HS256",expiresIn:"2h"});
  res.json({mensaje:"Inicio de sesión exitoso",token,usuario:publicUser(user)});
});

app.get("/api/perfil",autenticar,(req,res)=>{
  res.json({usuario:publicUser(req.user)});
});

app.get("/api/productos",autenticar,(req,res)=>{
  res.json({productos:[
    {id:1,nombre:"Taladro",precio:199},
    {id:2,nombre:"Pintura",precio:65},
    {id:3,nombre:"Casco de seguridad",precio:35}
  ]});
});

app.get("/api/ventas",autenticar,permitir("ADMIN","VENDEDOR"),(req,res)=>{
  res.json({mensaje:"Acceso autorizado al módulo de ventas",ventas:[]});
});

app.get("/api/admin",autenticar,permitir("ADMIN"),(req,res)=>{
  res.json({mensaje:"Panel administrativo autorizado",usuarios:readUsers().map(publicUser)});
});

app.use(express.static(path.join(__dirname,"public")));

app.use((err,req,res,next)=>{
  console.error(err);
  res.status(500).json({error:"Error interno del servidor"});
});

app.listen(PORT,()=>{
  console.log("FERRETERÍA CAYO - SEMANA 10");
  console.log("Servidor Express: http://localhost:"+PORT);
  console.log("Registro, login, roles y seguridad habilitados");
});
