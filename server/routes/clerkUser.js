const clerk = require('@clerk/clerk-sdk-node');
const { ApiGatewayManagementApi } = require('aws-sdk');
async function getAllUsers() {
  try {
    const userList = await clerk.users.getUserList();
    console.log(userList);
  } catch (error) {
    console.error('Error fetching users:', error.message);
  }
}

async function getUserDetails(userId) {
    try {
      const user = await clerk.users.getUser(userId);
      return user;
    } catch (error) {
      console.error('Error fetching user:', error.message);
      return null;
    }
}

// getAllUsers();

const userId = 'user_2Sa33YkNtVLnO3psP2CcvDJbCls';
getUserDetails(userId)
  .then((user) => {
    if (user) {
      console.log('User Details:', user);
    } else {
      console.log('User not found.');
    }
  })
  .catch((error) => {
    console.error('Error:', error.message);
  });