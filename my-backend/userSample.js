const bcrypt = require('bcryptjs');

async function createSampleUser() {
  const username = 'user';
  const password = '123';
  const role = 'user';
  

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  console.log(`INSERT INTO Users (username, password_hash, role) VALUES ('${username}', '${passwordHash}', '${role}');`);
}

createSampleUser();
