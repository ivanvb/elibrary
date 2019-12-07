# eLibrary

Proyecto final de la clase de Diseño y Analisis de sistemas. La aplicación permite al usuario crear libros, y el servidor se encargará de convertir los mismos a formato de audio y a almacenarlos en la nube.

Este es el grupo #7 estuvo conformado por:
* Iván Valette 2016-6599
* Irwin Inoa 2017-6221
## Configurar el proyecto

Dentro del directorio ```server``` se debe crear un archivo ```.env``` el cual tendrá los valores de
configuración para que el lado del servidor del proyecto funcione adecuadamente. Los valores
necesarios para el correcto funcionamiento del proyecto son

```
#database
DATABASE_URL="url de conexion mongodb"

#aws
aws_access_key_id=YOUR_ACCESS_KEY   #access key de aws
aws_secret_access_key=YOUR_SECRET_KEY  #secret key aws 
BUCKET_NAME=YOUR_S3_BUCKET_NAME   #nombre del bucket en S3

#encryption
SALT_ROUNDS=NUMBER   #numero utilizado para encriptar passwords.
ENCRYPTION_KEY=YOUR_ENCRYPTIONKEY    #llave de encriptacion de passwords
```