db.createCollection('users');
db.users.insert({
    email: "admin@admin.com",
    password: "$2a$10$UaZbsc85llJOvbmLsId.pe2CyxnqK6SKUuOjZK61wQVIhJXicKv7m",
    role: "admin",
});