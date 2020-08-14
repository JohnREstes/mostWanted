// // User can be part of many groups
// const user = {
//   groups: ["group2"]
// };

// // Roles can have many groups
// // What you see here is the output or 2 different data source
// // Thats why we have group duplication inside different role
// const roles = [{
//   name: "role1",
//   groups: [{
//     id: "group1"
//   }]
// }, {
//   name: "role2",
//   groups: [{
//     id: "group1"
//   }, {
//     id: "group2"
//   }]
// }];

// const result = roles.filter(role => role.groups.find(group => user.groups.includes(group.id)));
// console.log(result);

// const data = [
// 	{
// 		"id": 272822514,
// 		"firstName": "Billy",
// 		"lastName": "Bob",
// 		"gender": "male",
// 		"dob": "1/18/1949",
// 		"height": 71,
// 		"weight": 175,
// 		"eyeColor": "brown",
// 		"occupation": "programmer",
// 		"parents": [693243224, 888201200],
// 		"currentSpouse": 401222887
// 	},
// 	{
// 		"id": 401222887,
// 		"firstName": "Uma",
// 		"lastName": "Bob",
// 		"gender": "female",
// 		"dob": "4/1/1947",
// 		"height": 65,
// 		"weight": 162,
// 		"eyeColor": "brown",
// 		"occupation": "assistant",
// 		"parents": [693243227, 888201200],
// 		"currentSpouse": 272822514
//     }
// ]   
//     const results = data.filter(newData => newData.parents.find(id => 693243224));
//     console.log(results);

    const deciduous = [
        { name: "birch", count: [4] },
        { name: "maple", count: [5] },
        { name: "oak", count: [2] }
      ];
      
      const evergreens = [
        { name: "cedar", count: [2, 9] },
        { name: "fir", count: [6, 0] },
        { name: "pine", count: [3, 7] }
      ];
      
      // our testing function
      const hasFiveOrMore = el => el.count >= 5;
      
      const decResult = deciduous.filter(el => el.count[0] >= 5);
      // { name: "maple", count: 5 }
      
      const evgResult = evergreens.filter(el => el.count[1] >= 5);
      // { name: "fir", count: 6 }