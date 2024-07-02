

import { Sequelize, DataTypes } from 'sequelize';


const sequelize =new Sequelize('mamatha', 'mamatha', 'mamatha',{
    host: 'localhost',
    //port:5432,
    dialect: 'postgres'
} );

async function checkConn() {
    try {
        await sequelize.authenticate();
        console.log("DONE")
    }
    catch(err) {
        console.log("ERORR ", err);
    }
}
checkConn();

const Netflix_user = sequelize.define('Netflix_user', {
    user_id: {
        type: DataTypes.INTEGER,
        PrimaryKey:  true,
        unique: true,
       // autoIncrement: true, 
    },
    user_name: {
        type: DataTypes.STRING,
    },
    user_password:{
        type: DataTypes.INTEGER,
    },
    email: {
        type: DataTypes.STRING,
    },

});

const Netflix_profile = sequelize.define('Netflix_profile', {
    profile_id: {
        type: DataTypes.INTEGER,
        PrimaryKey: true,
        unique: true,
        //autoIncrement: true,
    },
    profile_name: {
        type: DataTypes.STRING,
    },
    age: {
        type: DataTypes.INTEGER,
    },
    Lang_Preference:{
        type: DataTypes.STRING,
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Netflix_user,
            key: 'user_id',
            //deferrable: Deferrable.INITIALLY_IMMEDIATE,
        },
    },
});
const Content = sequelize.define('Content', {
    content_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
        //autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING,
    },
    description:{
        type: DataTypes.STRING,
    },
    release_date: {
        type: DataTypes.DATE,
    },
    duration:{
        type: DataTypes.FLOAT,
    },
    rating: {
        type: DataTypes.FLOAT,
    },
});

const Watch_History = sequelize.define('Watch_History', {
    watch_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
       // autoIncrement: true,
    },
    watch_date: {
        type: DataTypes.DATE,
    },
    profile_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Netflix_profile,
            key: 'profile_id',
            //deferrable: Deferrable.INITIALLY_IMMEDIATE,
        },
    },
    content_id: {
        type: DataTypes.INTEGER,
        references:  {
            model: Content,
            key: 'content_id',
            //deferrable: Deferrable.INITIALLY_IMMEDIATE,

        },
    },

});
sequelize.sync({force: true})
.then(() => {
    console.log('Database synchronized ');
})
.catch(err => {
    console.log('Error synchronizing database',err);
});


