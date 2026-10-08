# Poner la app en internet (VPS)

Arquitectura en el VPS (la misma que estudiar-desarrollo; las dos pueden convivir):

```text
internet ──HTTPS──▶ Caddy :443 ──┬─▶ matematica  127.0.0.1:8091 ──▶ /var/lib/matematica
                  (certificado   │   (servicio systemd, con login)     matematica.db + media/
                   automático)   └─▶ estudiar    127.0.0.1:8090 ──▶ /var/lib/estudiar
```

- **Caddy** atiende internet, saca y renueva solo el certificado HTTPS (Let's Encrypt). Cada app tiene su archivo en `/etc/caddy/sitios/`.
- **La app** solo escucha dentro del servidor y **pide contraseña**.
- **Firewall**: solo quedan abiertos SSH (22), HTTP (80) y HTTPS (443).
- **Backups**: uno por día a las 04:15, se guardan los últimos 14.
- **Consumo**: unos 60 MB de RAM por app y CPU casi nula (las fórmulas y los gráficos se dibujan en tu navegador, no en el servidor). Un VPS de 1 núcleo y 4 GB sobra para las dos.

Todos los comandos de esta guía se corren en **Git Bash**, en la carpeta del proyecto (`C:\Proyectos\estudiar-matematica`).

---

## 0. Antes de pagar: correrla local

| Para… | Hacé |
|---|---|
| Usarla en esta PC | Doble clic en `iniciar.cmd` (o `npm start`) → <http://localhost:8091>. Sin contraseña: solo esta PC puede entrar. |
| Abrirla desde el celular en tu red de casa | `npm run password`, y en `.env` poné `HOST=0.0.0.0`. Abrí `http://IP-DE-TU-PC:8091` y aceptá el aviso del firewall de Windows. |

## 1. El VPS y la clave SSH

Si ya instalaste estudiar-desarrollo en el VPS, saltá al paso 3: se usa el mismo VPS y la misma clave.

1. **Sistema operativo**: Ubuntu 24.04 LTS, sin panel ni aplicaciones.
2. **Clave SSH** (una sola vez, en tu PC):

```bash
ssh-keygen -t ed25519 -C "estudiar"
```

```bash
cat ~/.ssh/id_ed25519.pub
```

Esa línea (`ssh-ed25519 AAAA…`) se pega en el panel de Hostinger (*VPS → Configuración → Claves SSH*). Probá entrar:

```bash
ssh root@IP-DEL-VPS
```

## 2. Dominio

Con un dominio, cada app va en un subdominio: por ejemplo `matematica.tudominio.com` y `desarrollo.tudominio.com`. En Hostinger: *Dominios → tu dominio → DNS* → registro **A** con nombre `matematica` y valor la **IP del VPS**. Para verificarlo:

```bash
nslookup matematica.tudominio.com
```

> **Sin dominio** también funciona: se usa `https://matematica.IP-CON-GUIONES.sslip.io` (por ejemplo `https://matematica.203-0-113-7.sslip.io`), con HTTPS igual.

## 3. Subir el código e instalar (una sola vez)

```bash
bash deploy/subir.sh root@IP-DEL-VPS
```

```bash
ssh -t root@IP-DEL-VPS bash /opt/matematica/app/deploy/setup-vps.sh matematica.tudominio.com
```

El instalador te pide la **contraseña para entrar a la app** (mínimo 10 caracteres) y al final muestra la dirección. Sin dominio, sacá `matematica.tudominio.com` del comando.

## 4. Mudar tus notas al servidor (una sola vez)

```bash
bash deploy/subir-datos.sh root@IP-DEL-VPS
```

Copia tus notas e imágenes de esta PC al VPS. **Reemplaza** lo que haya allá, pero antes guarda un backup.

**Listo**: entrá a `https://matematica.tudominio.com` desde cualquier lado.

---

## Día a día

| Querés… | Comando |
|---|---|
| Subir cambios del código | `bash deploy/subir.sh root@IP` |
| Bajar un backup de tus notas a la PC | `bash deploy/bajar-backup.sh root@IP` (queda en `backups/`) |
| Cambiar la contraseña | `ssh -t root@IP "node /opt/matematica/app/scripts/password.mjs --env /opt/matematica/.env && systemctl restart matematica"` |
| Ver si la app está viva | `ssh root@IP systemctl status matematica` |
| Ver los logs | `ssh root@IP journalctl -u matematica -n 100` |
| Reiniciar | `ssh root@IP systemctl restart matematica` |

## Dónde queda cada cosa en el VPS

| Ruta | Qué es |
|---|---|
| `/opt/matematica/app` | El código |
| `/opt/matematica/.env` | La configuración y el hash de la contraseña (solo lo lee la app) |
| `/var/lib/matematica` | **Tus datos**: `matematica.db` y `media/` |
| `/var/backups/matematica` | Backups diarios (los últimos 14) |
| `/etc/caddy/sitios/matematica.caddy` | HTTPS y dominio de esta app |

## Si algo falla

- **"La app no respondió"**: `journalctl -u matematica -n 50` muestra el error.
- **El navegador avisa que el certificado no es válido**: el DNS todavía no apunta al VPS (`nslookup matematica.tudominio.com`). Cuando apunte, `systemctl restart caddy`.
- **Me olvidé la contraseña**: cambiala con el comando de la tabla de arriba.
- **Me bloqueó por intentos**: esperá 15 minutos (o reiniciá la app).
