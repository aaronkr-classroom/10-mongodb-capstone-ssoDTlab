// seed.js
"use strict";

/**
 * Listing 15.9 (p. 224)
 * 새로운 데이터 생성
 */
// 모듈 가져오기
const mongoose = require("mongoose"),
    Subscriber = require("./models/Subscriber");

// 데이터베이스 연결 설정
mongoose.connect(
    "mongodb+srv://llfkstep9811:gfR33Op9EruTpAoS@ut-node.e8lneix.mongodb.net/?retryWrites=true&w=majority&appName=ut-node" // 데이터베이스 연결 설정
);
mongoose.connection;
// subscribers 배열 생성 (5개 이상)
var subscribers = [
  {
    name: "Hulk",
    email: "a@a.com",
    newletter: true,
  },
  {
    name: "Dr.Wizard",
    email: "b@b.com",
    newletter: false,
  },
  {
    name: "Hawkeye",
    email: "c@c.com",
    newletter: true,
  },
  {
    name: "Iron Main",
    email: "d@d.com",
    newletter: false,
  },
  {
    name: "tanos",
    email: "e@e.com",
    newletter: true,
  },
  {
    name: "finix",
    email: "f@f.com",
    newletter: false,
  },
];


// 기존 데이터 제거
Subscriber
    .deleteMany({})
    .exec()
    .then(result => {
        console.log(`Deleted ${result.deletedCount} records.`);
    })
    .catch(error => {
        console.log(`Error: ${error.message}`);
    });

var commands = [];
setTimeout(() => {
  // 프라미스 생성을 위한 구독자 객체 루프
subscribers.forEach(s => {
    commands.push(
        Subscriber
        .create({
            name: s.name,
            email: s.email,
            newsletter: s.newletter
        })
        .then(s => {
            console.log(`Created: ${s.name}`);
        })
    );
});

// 프라미스 생성 후 로깅 작업
Promise.all(commands)
    .then( r => {
        console.log(JSON.stringify(r,null,2));
        mongoose.connection.close(); //오류가 나올 수도 있다.
    })
    .catch(e => {
        console.log(e);
    });
},500);