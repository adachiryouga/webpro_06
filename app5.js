"use strict";

const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.render('top'); // views/top.ejs を表示する
});

let station = [
  { id:1, code:"JE01", name:"東京駅"},
  { id:2, code:"JE07", name:"舞浜駅"},
  { id:3, code:"JE12", name:"新習志野駅"},
  { id:4, code:"JE13", name:"幕張豊砂駅"},
  { id:5, code:"JE14", name:"海浜幕張駅"},
  { id:6, code:"JE05", name:"新浦安駅"},
];

app.get("/keiyo", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  res.render('db1', { data: station });
});

app.get("/keiyo_add", (req, res) => {
  let id = req.query.id;
  let code = req.query.code;
  let name = req.query.name;
  let newdata = { id: id, code: code, name: name };
  station.push( newdata );
  res.redirect('/public/keiyo_add.html');
  res.render('db1', { data: station });

});

let station2 = [
  { id:1, code:"JE01", name:"東京駅", change:"総武本線，中央線，etc", passengers:403831, distance:0 },
  { id:2, code:"JE02", name:"八丁堀駅", change:"日比谷線", passengers:31071, distance:1.2 },
  { id:3, code:"JE05", name:"新木場駅", change:"有楽町線，りんかい線", passengers:67206, distance:7.4 },
  { id:4, code:"JE07", name:"舞浜駅", change:"舞浜リゾートライン", passengers:76156,distance:12.7 },
  { id:5, code:"JE12", name:"新習志野駅", change:"", passengers:11655, distance:28.3 },
  { id:6, code:"JE17", name:"千葉みなと駅", change:"千葉都市モノレール", passengers:16602, distance:39.0 },
  { id:7, code:"JE18", name:"蘇我駅", change:"内房線，外房線", passengers:31328, distance:43.0 },
];

app.get("/keiyo2", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  res.render('keiyo2', {data: station2} );
});

app.post("/keiyo2", (req, res) => {
  const newData = {
    id: Number(req.body.id),
    code: req.body.code,
    name: req.body.name,
    change: req.body.change,
    passengers: Number(req.body.passengers),
    distance: Number(req.body.distance)
  };

  station2.push(newData);
  res.redirect("/keiyo2");
});


app.get("/keiyo2/:number", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const number = req.params.number;
  const detail = station2[ number ];
  res.render('keiyo2_detail', {data: detail} );
});

app.get("/keiyo2_edit/:number", (req, res) => {
  const number = req.params.number;
  const data = station2[number];
  res.render("keiyo2_edit", { data });
});

let fruits = [
  {
    id: 1,
    name: "りんご",
    color: "赤（品種により黄色や緑も存在）",
    taste: "甘みと酸味のバランスがよい",
    texture: "シャキッとしている",
    usage: "生食 / ジュース / ジャム / 焼き菓子 / サラダ",
    season: "秋〜冬（品種による）",
    description: "りんごは保存しやすく，幅広い料理やお菓子に使われる万能な果物である．",
    image: "ringo.jpg"
  },
  {
    id: 2,
    name: "さくらんぼ",
    color: "明るい赤〜濃い赤",
    taste: "甘味が強く上品",
    texture: "みずみずしい・弾力がある",
    usage: "生食 / ケーキの飾り / コンポート / ジュース",
    season: "初夏（6〜7月頃）",
    description: "さくらんぼは鮮度が重要と言われており，収穫直後が最も美味しいとされる．",
    image: "sakurannbo.jpg"
  },
  {
    id: 3,
    name: "いちご",
    color: "鮮やかな赤",
    taste: "甘酸っぱい・香りが強い",
    texture: "やわらかくジューシー",
    usage: "生食 / ケーキ / ジャム / スムージー / デザート全般",
    season: "冬〜春（12〜5月頃）",
    description: "いちごは，赤い色と甘酸っぱい風味が特徴の果物であり，そのまま食べても美味しい他，スイーツとの相性がよいためケーキやジャムなどの用途でも親しまれている．",
    image: "itigo.jpg"
  }, 
  {
    id: 4,
    name: "スイカ",
    color: "皮は緑と黒、果肉は鮮やかな赤",
    taste: "水分が多く、さっぱりとした甘さ",
    texture: "シャリシャリしている",
    usage: "生食 / ジュース / フルーツポンチ / スイカ割り",
    season: "夏（6〜8月頃）",
    description: "野菜に分類されることもあるが、夏の風物詩として欠かせない赤い果実である。",
    image: "suika.jpg"
  },
  {
    id: 5,
    name: "ラズベリー",
    color: "深みのある赤ピンク",
    taste: "甘酸っぱく、独特の芳醇な香り",
    texture: "つぶつぶとして柔らかい",
    usage: "ケーキの飾り / ジャム / ソース / お菓子全般",
    season: "初夏〜秋（6月〜10月頃）",
    description: "フランボワーズとも呼ばれ、見た目の可愛らしさと香りの良さから洋菓子によく使われる。",
    image: "raspberry.jpg"
  },
  {
    id: 6,
    name: "ザクロ",
    color: "透き通ったルビー色（粒）",
    taste: "爽やかな酸味と甘み",
    texture: "プチプチとはじける食感",
    usage: "サラダ / ジュース / シロップ（グレナデン）",
    season: "秋（9〜11月頃）",
    description: "硬い皮の中に宝石のような赤い粒が詰まっており、美容や健康によい果物として人気がある。",
    image: "zakuro.jpg"
  },
  {
    id: 7,
    name: "クランベリー",
    color: "濃く暗い赤",
    taste: "非常に酸味が強く、渋みもある",
    texture: "皮がしっかりしている",
    usage: "ジュース / ドライフルーツ / ソース（肉料理用）",
    season: "秋〜冬（9月〜11月頃）",
    description: "生で食べることは少なく、加工してジュースやドライフルーツとして楽しまれることが多い。",
    image: "cranberry.jpg"
  },
  {
    id: 8,
    name: "アセロラ",
    color: "光沢のある鮮やかな赤",
    taste: "酸味が強い",
    texture: "皮が薄く果肉は柔らかい",
    usage: "ジュース / ゼリー / サプリメント",
    season: "春〜夏（5月〜11月頃）",
    description: "圧倒的なビタミンC含有量を誇り、鮮度が落ちやすいため産地以外では加工品が一般的である。",
    image: "acerola.jpg"
  }
];

// 2. 一覧表示画面 ( http://localhost:8080/fruits )
app.get("/fruits", (req, res) => {
  res.render('fruits_list', { fruits: fruits });
});

app.get("/fruits/add", (req, res) => {
  res.render("fruits_add");
});

// 2.6 新規追加処理
app.post("/fruits/add", (req, res) => {
  // 新しいIDを自動で決める（今の最後のID + 1）
  const newId = fruits.length > 0 ? fruits[fruits.length - 1].id + 1 : 1;
  
  const newFruit = {
    id: newId,
    name: req.body.name,
    color: req.body.color,
    taste: req.body.taste,
    texture: req.body.texture,
    usage: req.body.usage,
    season: req.body.season,
    description: req.body.description,
    image: req.body.image
  };

  fruits.push(newFruit);
  res.redirect("/fruits");
});

// 3. 詳細表示画面 ( http://localhost:8080/fruits/1 など )
app.get("/fruits/:id", (req, res) => {
  const id = Number(req.params.id);
  const fruit = fruits.find(f => f.id === id);
  
  if (fruit) {
    res.render('fruits_detail', { fruit: fruit });
  } else {
    res.status(404).send("果物が見つかりません");
  }
});

// 4. 編集画面
app.get("/fruits/edit/:id", (req, res) => {
  const id = Number(req.params.id);
  const fruit = fruits.find(f => f.id === id);
  
  if (fruit) {
    res.render('fruits_edit', { fruit: fruit });
  } else {
    res.status(404).send("果物が見つかりません");
  }
});

// 5. 更新処理 (保存ボタンを押した後)
app.post("/fruits/update/:id", (req, res) => {
  const id = Number(req.params.id);
  const fruitIndex = fruits.findIndex(f => f.id === id);

  if (fruitIndex !== -1) {
    // フォームから送られてきたデータで上書き
    fruits[fruitIndex].name = req.body.name;
    fruits[fruitIndex].color = req.body.color;
    fruits[fruitIndex].taste = req.body.taste;
    fruits[fruitIndex].texture = req.body.texture;
    fruits[fruitIndex].usage = req.body.usage;
    fruits[fruitIndex].season = req.body.season;
    fruits[fruitIndex].description = req.body.description;
    fruits[fruitIndex].image = req.body.image;
    
    // 詳細画面に戻る
    res.redirect(`/fruits/${id}`);
  } else {
    res.status(404).send("更新対象の果物が見つかりません");
  }
});

app.post("/fruits/delete/:id", (req, res) => {
  const id = Number(req.params.id);
  // 指定されたID以外のものを残すことで、そのIDを削除する
  fruits = fruits.filter(f => f.id !== id);
  res.redirect("/fruits");
});


let planets = [
  {
    id: 1,
    name: "太陽 (Sun)",
    type: "恒星",
    diameter: "約139万km (地球の109倍)",
    feature: "自ら光と熱を出す巨大なガスの塊",
    description: "太陽系の中心にあり、すべての惑星はこの周りを回っている。表面温度は約6000度もある。",
    image: "sun.jpg"
  },
  {
    id: 2,
    name: "水星 (Mercury)",
    type: "岩石惑星",
    diameter: "4,879km",
    feature: "太陽に一番近く、昼と夜の温度差が激しい",
    description: "大気がほとんどなく、昼は400度以上、夜はマイナス160度以下になる過酷な環境。",
    image: "mercury.jpg"
  },
  {
    id: 3,
    name: "金星 (Venus)",
    type: "岩石惑星",
    diameter: "12,104km",
    feature: "地球と大きさが似ているが、超高温",
    description: "分厚い二酸化炭素の大気による温室効果で、表面温度は460度を超える。輝きが強く「宵の明星」などと呼ばれる。",
    image: "venus.jpg"
  },
  {
    id: 4,
    name: "地球 (Earth)",
    type: "岩石惑星",
    diameter: "12,742km",
    feature: "水と生命が存在する奇跡の星",
    description: "表面の約7割が海で覆われている。大気が適度な温度を保ち、多様な生物が暮らしている。",
    image: "earth.jpg"
  },
  {
    id: 5,
    name: "火星 (Mars)",
    type: "岩石惑星",
    diameter: "6,779km",
    feature: "赤い大地と砂嵐",
    description: "酸化鉄（赤さび）を多く含む土により赤く見える。かつては水があったと考えられており、探査が盛んに行われている。",
    image: "mars.jpg"
  },
  {
    id: 6,
    name: "木星 (Jupiter)",
    type: "巨大ガス惑星",
    diameter: "139,820km",
    feature: "太陽系で一番大きく、大赤斑がある",
    description: "地球が1300個入るほど巨大。ガスでできており、表面には縞模様や巨大な嵐（大赤斑）が見られる。",
    image: "jupiter.jpg"
  },
  {
    id: 7,
    name: "土星 (Saturn)",
    type: "巨大ガス惑星",
    diameter: "116,460km",
    feature: "美しい巨大な環（リング）を持つ",
    description: "氷や岩の粒でできた大きなリングが特徴。水に浮くほど密度が小さい（軽い）惑星である。",
    image: "saturn.jpg"
  },
  {
    id: 8,
    name: "天王星 (Uranus)",
    type: "巨大氷惑星",
    diameter: "50,724km",
    feature: "青白く、横倒しで自転している",
    description: "メタンの影響で青緑色に見える。自転軸が約98度傾いており、ほぼ横倒しの状態で公転している。",
    image: "uranus.jpg"
  },
  {
    id: 9,
    name: "海王星 (Neptune)",
    type: "巨大氷惑星",
    diameter: "49,244km",
    feature: "太陽から最も遠く、強い風が吹く",
    description: "鮮やかな青色が特徴。太陽から非常に遠いため極寒で、猛烈な嵐が吹き荒れている。",
    image: "neptune.jpg"
  }
];

// 2. 一覧表示画面 ( http://localhost:8080/solar )
app.get("/solar", (req, res) => {
  res.render('solar_list', { planets: planets });
});

app.get("/solar/add", (req, res) => {
  res.render("solar_add");
});

// 2.6 新規追加処理
app.post("/solar/add", (req, res) => {
  const newId = planets.length > 0 ? planets[planets.length - 1].id + 1 : 1;
  
  const newPlanet = {
    id: newId,
    name: req.body.name,
    type: req.body.type,
    diameter: req.body.diameter,
    feature: req.body.feature,
    description: req.body.description,
    image: req.body.image
  };

  planets.push(newPlanet);
  res.redirect("/solar");
});

// 3. 詳細表示画面 ( http://localhost:8080/solar/1 など )
app.get("/solar/:id", (req, res) => {
  const id = Number(req.params.id);
  const planet = planets.find(p => p.id === id);
  if (planet) {
    res.render('solar_detail', { planet: planet });
  } else {
    res.status(404).send("惑星が見つかりません");
  }
});
// 4. 編集画面 (太陽系)
app.get("/solar/edit/:id", (req, res) => {
  const id = Number(req.params.id);
  const planet = planets.find(p => p.id === id);
  if (planet) {
    res.render('solar_edit', { planet: planet });
  } else {
    res.status(404).send("惑星が見つかりません");
  }
});

// 5. 更新処理 (太陽系)
app.post("/solar/update/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = planets.findIndex(p => p.id === id);

  if (index !== -1) {
    // フォームのデータで上書き
    planets[index].name = req.body.name;
    planets[index].type = req.body.type;
    planets[index].diameter = req.body.diameter;
    planets[index].feature = req.body.feature;
    planets[index].description = req.body.description;
    planets[index].image = req.body.image;
    
    
    res.redirect(`/solar/${id}`);
  } else {
    res.status(404).send("更新対象が見つかりません");
  }
});


app.post("/solar/delete/:id", (req, res) => {
  const id = Number(req.params.id);
  
  planets = planets.filter(p => p.id !== id);
  res.redirect("/solar");
});

let parrots = [
  {
    id: 1,
    name: "セキセイインコ",
    color: "青、緑、黄、白など多彩",
    size: "小型 (約18cm)",
    lifespan: "7〜10年",
    feature: "おしゃべりが得意で人懐っこい",
    description: "最もポピュラーなペットバード。好奇心旺盛で、言葉を覚えるのが得意な個体が多い。",
    image: "budgie.jpg"
  },
  {
    id: 2,
    name: "オカメインコ",
    color: "グレー、白、黄色（頬が赤い）",
    size: "中型 (約30cm)",
    lifespan: "15〜20年",
    feature: "頭の冠羽（かんう）と赤いほっぺが特徴",
    description: "穏やかで寂しがり屋な性格。おしゃべりより口笛の真似が得意。",
    image: "cockatiel.jpg"
  },
  {
    id: 3,
    name: "ヨウム",
    color: "全身グレーで尾羽だけ赤い",
    size: "大型 (約33cm)",
    lifespan: "40〜50年",
    feature: "鳥類で最も知能が高いと言われる",
    description: "5歳児並みの知能を持つと言われ、言葉の意味を理解して会話ができる天才的なオウム。",
    image: "africangrey.jpg"
  },
  {
    id: 4,
    name: "ルリコンゴウインコ",
    color: "鮮やかな青と黄色",
    size: "超大型 (約80cm)",
    lifespan: "50年以上",
    feature: "ド派手な見た目と大きな声",
    description: "南国の鳥の代表格。非常に力が強く、大きく美しい見た目で動物園でも人気。",
    image: "macaw.jpg"
  },
  {
    id: 5,
    name: "コバタン",
    color: "白（冠羽は黄色）",
    size: "中大型 (約33cm)",
    lifespan: "40〜50年",
    feature: "ダンスが好きでスキンシップを好む",
    description: "真っ白な体に黄色い冠羽が美しい。非常に甘えん坊だが、興奮すると雄叫びを上げることがある。",
    image: "cockatoo.jpg"
  },
  {
    id: 6,
    name: "コザクラインコ",
    color: "緑と赤（顔）、品種により多様",
    size: "小型 (約15cm)",
    lifespan: "10〜15年",
    feature: "パートナーへの愛情が非常に深い",
    description: "英語で「ラブバード」と呼ばれるほどパートナーへの愛情が深く、飼い主によく懐く。少し気が強い一面もある。",
    image: "lovebird.jpg"
  },
  {
    id: 7,
    name: "コガネメキシコインコ",
    color: "鮮やかな黄色とオレンジ",
    size: "中型 (約30cm)",
    lifespan: "15〜25年",
    feature: "太陽のような派手な色と人懐っこさ",
    description: "非常に甘えん坊で遊び好き。鳴き声は大きめだが、その美しい羽色と陽気な性格で人気がある。",
    image: "sunconure.jpg"
  }
];


app.get("/parrots", (req, res) => {
  res.render('parrots_list', { parrots: parrots });
});

app.get("/parrots/add", (req, res) => {
  res.render("parrots_add");
});

// 新規追加処理
app.post("/parrots/add", (req, res) => {
  const newId = parrots.length > 0 ? parrots[parrots.length - 1].id + 1 : 1;
  
  const newParrot = {
    id: newId,
    name: req.body.name,
    color: req.body.color,
    size: req.body.size,
    lifespan: req.body.lifespan,
    feature: req.body.feature,
    description: req.body.description,
    image: req.body.image
  };

  parrots.push(newParrot);
  res.redirect("/parrots");
});

app.get("/parrots/:id", (req, res) => {
  const id = Number(req.params.id);
  const parrot = parrots.find(p => p.id === id);
  if (parrot) {
    res.render('parrots_detail', { parrot: parrot });
  } else {
    res.status(404).send("オウムが見つかりません");
  }
});


app.get("/parrots/edit/:id", (req, res) => {
  const id = Number(req.params.id);
  const parrot = parrots.find(p => p.id === id);
  if (parrot) {
    res.render('parrots_edit', { parrot: parrot });
  } else {
    res.status(404).send("オウムが見つかりません");
  }
});


app.post("/parrots/update/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = parrots.findIndex(p => p.id === id);

  if (index !== -1) {
    parrots[index].name = req.body.name;
    parrots[index].color = req.body.color;
    parrots[index].size = req.body.size;
    parrots[index].lifespan = req.body.lifespan;
    parrots[index].feature = req.body.feature;
    parrots[index].description = req.body.description;
    parrots[index].image = req.body.image;
    
    res.redirect(`/parrots/${id}`);
  } else {
    res.status(404).send("更新対象が見つかりません");
  }
});


app.post("/parrots/delete/:id", (req, res) => {
  const id = Number(req.params.id);
  parrots = parrots.filter(p => p.id !== id);
  res.redirect("/parrots");
});


app.get("/hello1", (req, res) => {
  const message1 = "Hello world";
  const message2 = "Bon jour";
  res.render('show', { greet1:message1, greet2:message2});
});

app.get("/hello2", (req, res) => {
  res.render('show', { greet1:"Hello world", greet2:"Bon jour"});
});

app.get("/icon", (req, res) => {
  res.render('icon', { filename:"./public/Apple_logo_black.svg", alt:"Apple Logo"});
});

app.get("/omikuji1", (req, res) => {
  const num = Math.floor( Math.random() * 6 + 1 );
  let luck = '';
  if( num==1 ) luck = '大吉';
  else if( num==2 ) luck = '中吉';

  res.send( '今日の運勢は' + luck + 'です' );
});

app.get("/omikuji2", (req, res) => {
  const num = Math.floor( Math.random() * 6 + 1 );
  let luck = '';
  if( num==1 ) luck = '大吉';
  else if( num==2 ) luck = '中吉';

  res.render( 'omikuji2', {result:luck} );
});

app.get("/janken", (req, res) => {
  let hand = req.query.hand;
  let win = Number( req.query.win );
  let total = Number( req.query.total );
  console.log( {hand, win, total});
  const num = Math.floor( Math.random() * 3 + 1 );
  let cpu = '';
  let judgement = '';
  if( num==1 ) cpu = 'グー';
  else if( num==2 ) cpu = 'チョキ';
  else cpu = 'パー';
  // ここに勝敗の判定を入れる
  // 以下の数行は人間の勝ちの場合の処理なので，
  // 判定に沿ってあいこと負けの処理を追加する
  judgement = '勝ち';
  win += 1;
  total += 1;
  const display = {
    your: hand,
    cpu: cpu,
    judgement: judgement,
    win: win,
    total: total
  }
  res.render( 'janken', display );
});

app.listen(8080, () => console.log("Example app listening on port 8080!"));
