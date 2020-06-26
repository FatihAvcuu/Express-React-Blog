var fs = require('fs');
var uid = require('uid');
const { json } = require('body-parser');

var DBpath = 'LeonDB/JSON/db.json';

module.exports = () => {
    fs.readFile(DBpath, 'utf-8', (err, data) => {
        if (err) {
            console.log('LeonDB creating...');
            fs.mkdir('LeonDB', () => {
                console.log('LeonDB file created...');
                fs.mkdir('LeonDB/JSON', () => {
                    console.log('JSON file created...');
                    fs.writeFile(DBpath, ' ', (err, data) => {
                        if (err) {
                            console.log('Something went wrong!');
                        }
                        else {
                            console.log('Success');
                        }
                    })
                })
            })
        }
        else {
            console.log('LeonDB working');
        }
    });

}

//Auth
module.exports.Auth = (name, pw, callback) => {
    console.log(`We get auth request from ${name}`);
    fs.readFile(DBpath, 'utf-8', (err, data) => {
        if (err) {
            console.log('An error occurred while being auth!');
            callback(null, 'err');
        }
        else {
            let users = JSON.parse(data).auth;
            if (users[name] === undefined) {
                callback(null, null);
            }
            else if (users[name].pw === pw) {
                callback(true, users[name]);
            }
            else {
                callback(false, null);
            }
        }
    })
}

module.exports.CreateUser = (name, email, pw, callback) => {
    console.log(`We get user create request from ${name}`);
    fs.readFile(DBpath, 'utf-8', (err, data) => {
        if (err) {
            console.log('An error occurred while create user!');
            callback(null, 'err');
        }
        else {
            let users = JSON.parse(data);
            if (users.auth[name] === undefined) {
                users.auth[name] = { name: name, pw: pw, email: email, id: uid(16) };
                fs.writeFile(DBpath, JSON.stringify(users), (err, data) => {
                    if (err) {
                        callback(null, 'err')
                    }
                    else {
                        callback(true, users.auth[name]);
                    }
                })
            }
            else {
                callback(false, null);
            }
        }
    })
}

module.exports.CreateBlog = (title, banner, description, md, id, name, callback) => {
    console.log(`We get new blog create request from ${name}`);
    fs.readFile(DBpath, 'utf-8', (err, data) => {
        if (err) {
            callback(404, null);
        }
        else {
            let users = JSON.parse(data);
            let bid = 0;
            if (users.blogs.length === 0) {
                bid = 0;
            }
            else {
                bid = users.blogs[users.blogs.length - 1].id + 1;
            }
            if (users.auth[name].id === id) {
                users.blogs.push({
                    title: title,
                    banner: banner,
                    description: description,
                    content: md,
                    id: bid
                });
                fs.writeFile(DBpath, JSON.stringify(users), (err, data) => {
                    if (err) {
                        callback(404, null)
                    }
                    else {
                        callback(201, 'success');
                    }
                })
            }
            else {
                callback(403, null);
            }
        }
    })
}

module.exports.Getblog = (callback) => {
    fs.readFile(DBpath, 'utf-8', (err, data) => {
        if (err) {
            callback(404, null);
        }
        else {
            let users = JSON.parse(data);
            let newBlogs = [];
            users.blogs.map(blog => {
                newBlogs.push({
                    title: blog.title,
                    banner: blog.banner,
                    description: blog.description,
                    id: blog.id
                })
            })
            callback(200, newBlogs.reverse())
        }
    })
}

module.exports.GetblogId = (id, callback) => {
    fs.readFile(DBpath, 'utf-8', (err, data) => {
        if (err) {
            callback(404, null);
        }
        else {
            let users = JSON.parse(data);
			let newblog = users.blogs.filter(blog => blog.id == id);
		callback(200, newblog[0])
        }
    })
}

module.exports.DeleteBlog = (blogid, userid, name, callback) => {
    fs.readFile(DBpath, 'utf-8', (err, data) => {
        if (err) {
            callback(404, null);
        }
        else {
            let users = JSON.parse(data);
            if (users.auth[name] != undefined && users.auth[name] != NaN && users.auth[name] != null) {
                if (users.auth[name].id == userid) {
                    users.blogs = users.blogs.filter(blog => blog.id != blogid);
                    fs.writeFile(DBpath, JSON.stringify(users), (err, data) => {
                        if (err) {
                            callback(404, null);
                        }
                        else {
                            callback(201, 'success');
                        }
                    })
                }
                else {
                    callback(403, null);
                }
            }
            else {
                callback(404, null);
            }
        }
    })
}

module.exports.UpdateBlog = (title, banner, description, md, userid, name, Blogid, callback) => {
    fs.readFile(DBpath, 'utf-8', (err, data) => {
        if (err) {
            callback(404, null);
        }
        else {
            let users = JSON.parse(data);
            if (users.auth[name] != undefined && users.auth[name] != NaN && users.auth[name] != null) {
                if (users.auth[name].id == userid) {
                    let BlogIndex = users.blogs.findIndex(data => { return data.id == Blogid });
                    if (BlogIndex != -1) {
                        users.blogs[BlogIndex] = {
                            title: title,
                            banner: banner,
                            description: description,
                            content: md,
                            id: Blogid
                        }
                        fs.writeFile(DBpath, JSON.stringify(users), (err, data) => {
                            if (err) {
                                callback(404, null);
                            }
                            else {
                                callback(200, 'success');
                            }
                        })
                    }
                    else {
                        callback(404, null);
                    }
                }
                else {
                    callback(403, null);
                }
            }
            else {
                callback(404, null);
            }
        }
    })
}