db.createUser(
    {
        user: "inpro",
        pwd: "inpro",
        roles: [
            {
                role: "readWrite",
                db: "inpro"
            }
        ]
    }
)