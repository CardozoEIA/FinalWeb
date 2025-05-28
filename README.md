# Modernize-Angular-pro
Modernize Angular Admin Dashboard

npm install            # Instala las dependencias
ng serve               # Inicia el servidor de desarrollo en localhost:4200
ng build               # Compila el proyecto para producción (dist/)

ng generate component nombre-componente      # Crea un componente
ng generate service nombre-servicio          # Crea un servicio
ng generate module nombre-modulo             # Crea un módulo
ng generate interface nombre-interfaz        # Crea una interfaz TypeScript

ng update                                   # Verifica o aplica actualizaciones de Angular
ng build --configuration production         # Build optimizado para deploy

1. This command help us to create a new migration file where allow us to modify the database model
```sh
npx sequelize-cli migration:generate --name name-of-your-migration
```

2. This command help us to apply migration changes into the database model
```sh
npx sequelize-cli db:migrate

npm install --save-dev nodemon sequelize-clifdgs