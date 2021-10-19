mongo -- "$MONGO_INITDB_DATABASE" <<EOF
    var user = '$MONGO_INITDB_ROOT_USERNAME';
    var password = '$MONGO_INITDB_ROOT_PASSWORD';
    var admin = db.getSiblingDB('admin');
    admin.auth(user, password);
    var todos = db.getSiblingDB($MONGO_INITDB_DATABASE);
    db.createCollection('lists');
    db.createCollection('items');
    db.createUser({user: user, pwd: password, roles: ["readWrite"]});
EOF