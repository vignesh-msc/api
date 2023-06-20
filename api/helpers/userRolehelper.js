// Node.js Backend

const getUserRoles = (userId) => {
    // Fetch the user document from the "users" collection
    const user = db.users.findOne({ _id: ObjectId(userId) });
  
    // Fetch the role documents based on the roles assigned to the user
    const roles = db.roles.find({ name: { $in: user.roles } }).toArray();
  
    // Extract and return the role names from the fetched role documents
    return roles.map((role) => role.name);
  };
  
