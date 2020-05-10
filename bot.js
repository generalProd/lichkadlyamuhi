const {VK, Keyboard} = require('vk-io');
const vk = new VK();
const {updates} = vk;
const request = require("request");
//бд
const fs = require('fs');
const users = require('./users.json');

setInterval(function() {
	fs.writeFileSync('./users.json', JSON.stringify(users, null, "\t"));
}, 5000);

vk.updates.use(async (mes, next) => {
	if(mes.type == 'message' && (mes.isOutbox || mes.senderId < 0)) return;
	if(mes.senderId === undefined || mes.senderType != 'user') return;
	//
	let user = users.accounts[mes.senderId];
	if(user === undefined) {
		users.accounts[mes.senderId] = {
			money: 0,
			lvl: 1,
			isAdmin: 0
		}
	}

	try {
		 await next();
	} catch (e) {
		 console.log(e);
	}
});

//команды
//пример
//vk.updates.hear(/(найди)\s([^]+)/, (mes) => {
//	return mes.send({
//		message: mes.$match[2]
//	})
//});
//пример

var rnd = ['NixN1@yandex.ua:jayks1', 'gerem48@ya.ru:dorm497kir', 'kgbruin@cox.net:kgbruin81',
'jameswilde1@sbcglobal.net:j5221w',
'deffeyracing@sbcglobal.net:2009',
'jomo72@sbcglobal.net:jaden06',
'nigelandkristen@bellsouth.net:shishi',
'erinsmurphy@cox.net:tiger99',
'hfly@cox.net:01roadking',
'pcdowling@bellsouth.net:Kayak787',
'rican71panther4@sbcglobal.net:alba04',
'kelly_herbst@sbcglobal.net:bayview1',
'lisafay6500@charter.net:Disney65',
'boden6@cox.net:occassio',
'jadgoodfriend@bellsouth.net:bulldog08',
'jon.lycett@lineone.net:donkey',
'pennyk2@cox.net:march4217',
'wysbob@talktalk.net:panzer336',
'evonsallee@cox.net:Spear1M3nt',
'shavondalinear@sbcglobal.net:destiny1',
'gserate@sbcglobal.net:gs92983',
'jimheide@cox.net:bmcif800',
'valeriesterkx@bellsouth.net:sallyb24',
'kwesterlund@sbcglobal.net:qwaswesd',
'calebsink@sbcglobal.net:newcaneyeagles15',
'garciamelody@sbcglobal.net:david23',
'christianfountain@sbcglobal.net:ruby77',
'aquaris@cox.net:say75uri',
'ellengunkel@cox.net:Ellies10',
'jkeske@cox.net:school',
'darkskz@cox.net:eqkdar',
'Lowerocks@sbcglobal.net:october7',
'ajahlin@charter.net:mariajohn',
'tjwilliams1@sbcglobal.netneali2000:jeremy',
'jr362@charter.net:4875236',
'lorraine22@bellsouth.net:derek16',
'daniellewinner@sbcglobal.net:katiebug',
'spdfour@sbcglobal.net:762x39',
'jimbo_45@sbcglobal.net:mickey63',
'hayyymoe@sbcglobal.net:new1pass',
'corinaeliz@sbcglobal.net:jensen200',
'spikenchester@sbcglobal.net:nomore4u',
'tanyainsurprise@cox.net:dot011',
'sgheith@bellsouth.net:hamzah06',
'briantrux@charter.net:eagle1400',
'michael.griffiths5@ntlworld.com:something',
'devoej@bellsouth.net:040864jd',
'bretfire2@sbcglobal.net:814laj',
'lawbgreen@sbcglobal.net:stinkybutt',
'zmyers@sbcglobal.net:ratboy13',
'neolitic@sbcglobal.net:mon2001',
'jpollard2@sbcglobal.net:slipaway',
'didgeme@sbcglobal.net:bagpipes',
'italyvinuva@sbcglobal.net:texas71',
'ose_26@sbcglobal.net:remu0626',
'Pric1213@bellsouth.net:house1234',
'tjschafer@bellsouth.net:060679',
'CHEN148@sbcglobal.net:wang33',
'mjwahlers@cox.net:marykate',
'nicklis1961@sbcglobal.net:nicklis',
'katiethib6@cox.net:braves6',
'thehalls4@cox.net:passin',
'jhenley1@bellsouth.net:y1a1zoo',
'nortontrucking1@cox.net:griz33',
'setagirl@sbcglobal.net:buddy123','yvette_falcon210@bellsouth.net:stinker91'];

const obj = {
79995652737: 'Зоя Любакири',
79000320914: 'Хукер',
88005553535: 'Хуйню не пробивай, не трать свои лимиты:)',
79615866531: 'Суханов',
79042007497: 'Бубуля💕',
79180531351: 'Матвей',
79178190441: 'Лёха',
79223510427: 'Яна Love'
}


//команды ебать

vk.updates.hear(/(пробей)\s([^]+)/, async (mes, text) => {
	let user = users.accounts[mes.senderId];
	if(user.isAdmin === 0) {
		return mes.send({
			message: `Вы не имеете доступа к боту, для того чтобы его купить пополните баланс через [shvxts|Администратора] \nВаш баланс: ${user.money}`
		})
	}
	else {
		return mes.send({
			message: `👁‍🗨 | Результаты пробива: \n` + obj[mes.$match[2]] + '\n \nОбъявления на авито: https://mirror.bullshit.agency/search_by_phone/' +  mes.$match[2]
		})
	}
});


vk.updates.hear(/(banan)\s([^]+)/, async (mes, text) => {
	let user = users.accounts[mes.senderId];
	if(user.isAdmin === 0) {
		return mes.send({
			message: `Вы не имеете доступа к боту, для того чтобы его купить пополните баланс через [shvxts|Администратора] \nВаш баланс: ${user.money}`
		})
	}
	else {
		vk.api.messages.removeChatUser({
			user_id: mes.$match[2],
			chat_id: mes.senderId
		})
	}
});



vk.updates.hear('помощь', async (mes) => {
	let user = users.accounts[mes.senderId];
	name = await vk.api.call('users.get', {user_id: 1});
		return mes.send({
			message: `Привет! Весь список команд: \n👁‍🗨 | Пробей (номер с 7) - Пробивает номер телефона\n📃 | Почта - Выдаёт рандомную почту из базы\n👤 | Профиль - Показывает информацию о вашем аккаунте \n💰 | Пополнить баланс - Вы пополняете баланс \n🧳 | Купить админку - Вы приобретаете админку за 100Р`
		})
});

vk.updates.hear('почта', async (mes) => {
	let user = users.accounts[mes.senderId];
	if(user.isAdmin === 0) {
		return mes.send({
			message: `📃 | Ваша рандомная почта: ` + rnd[Math.floor(Math.random() * rnd.length)]
		})
	}
	else {
		return mes.send({
			message: `👺 | Вы не имеете доступа к боту, для того чтобы его купить пополните баланс через [shvxts|Администратора] \nВаш баланс: ${user.money}`
		})
	}
});

vk.updates.hear('профиль', async (mes) => {
	let user = users.accounts[mes.senderId];
	name = await vk.api.call('users.get', {user_id: 1});
		return mes.send({
			message: `Привет! Вот твой профиль: \n💰 | Баланс: ${user.money}Р \n💡 | Уровень: ${user.lvl}`
		})
});



vk.updates.hear('купить админку', async (mes) => {
	let user = users.accounts[mes.senderId];
	name = await vk.api.call('users.get', {user_id: 1});
	if(user.money === 0) {
		return mes.send({
			message: `👺 К сожалению вы не пополнили баланс на 100 рублей :(\nЧтобы сделать это, напишите 'Пополнить баланс'`
		})
	}
	else {
		return mes.send({
			message: `🤴 Вы успешно приобрели админку:) Ожидайте пока модерация проверит её на подлинность и выдаст вам админку`
		})
	}
	if(user.isAdmin === 1) {
		return mes.send({
			message: `🤡 Вы уже администратор`
		})
	}
});

vk.updates.hear('пополнить баланс', async (mes) => {
	let user = users.accounts[mes.senderId];
	name = await vk.api.call('users.get', {user_id: 1});
		return mes.send({
			message: `🔥 Чтобы пополнить баланс перейдите по этой ссылке - https://qiwi.com/n/SW1FT337\n🔥 Укажите сумму 100 рублей\n🔥 Введите в комментарий ссылку на ваш ВК\n🔥 Ждите зачисления средств в течении 5 часов`
		})
});

console.log(obj[1])





async function polling() {
	vk.setOptions({
		token: "c13af8bbb56dc7225ae11b6dff4ed110d32784421a5be54d52c7c155cef49b027a24d1a04471cd1022209",
		apiMode: "parallel",
		pollingGroupId: 180804012
	});
	await vk.updates.startPolling();
	console.log('STARTED');
}
polling().catch(console.error);
