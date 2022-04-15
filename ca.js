(function(funcName, baseObj) {
    // The public function name defaults to window.docReady
    // but you can pass in your own object and own function name and those will be used
    // if you want to put them in a different namespace
    funcName = funcName || "docReady";
    baseObj = baseObj || window;
    // @ts-ignore
    var readyList = [];
    var readyFired = false;
    var readyEventHandlersInstalled = false;

    // call this when the document is ready
    // this function protects itself against being called more than once
    function ready() {
        if (!readyFired) {
            // this must be set to true before we start calling callbacks
            readyFired = true;
            for (var i = 0; i < readyList.length; i++) {
                // if a callback here happens to add new ready handlers,
                // the docReady() function will see that it already fired
                // and will schedule the callback to run right after
                // this event loop finishes so all handlers will still execute
                // in order and no new ones will be added to the readyList
                // while we are processing the list
                // @ts-ignore
                readyList[i].fn.call(window, readyList[i].ctx);
            }
            // allow any closures held by these functions to free
            readyList = [];
        }
    }

    function readyStateChange() {
        if ( document.readyState === "complete" ) {
            ready();
        }
    }

    // This is the one public interface
    // docReady(fn, context);
    // the context argument is optional - if present, it will be passed
    // as an argument to the callback
    // @ts-ignore
    baseObj[funcName] = function(callback, context) {
        if (typeof callback !== "function") {
            throw new TypeError("callback for docReady(fn) must be a function");
        }
        // if ready has already fired, then just schedule the callback
        // to fire asynchronously, but right away
        if (readyFired) {
            setTimeout(function() {callback(context);}, 1);
            return;
        } else {
            // add the function and context to the list
            readyList.push({fn: callback, ctx: context});
        }
        // if document already ready to go, schedule the ready function to run
        if (document.readyState === "complete") {
            setTimeout(ready, 1);
        } else if (!readyEventHandlersInstalled) {
            // otherwise if we don't have event handlers installed, install them
            if (document.addEventListener) {
                // first choice is DOMContentLoaded event
                document.addEventListener("DOMContentLoaded", ready, false);
                // backup is window load event
                window.addEventListener("load", ready, false);
            } else {
                // must be IE
                // @ts-ignore
                document.attachEvent("onreadystatechange", readyStateChange);
                // @ts-ignore
                window.attachEvent("onload", ready);
            }
            readyEventHandlersInstalled = true;
        }
    }
})("docReady", window);

function romanize(num: number) {
    var lookup: any = {M:1000,CM:900,D:500,CD:400,C:100,XC:90,L:50,XL:40,X:10,IX:9,V:5,IV:4,I:1},roman = '';
    let key: string;
    for (key in lookup ) {
        while ( num >= lookup[key] ) {
            roman += key;
            num -= lookup[key];
        }
    }
    return roman;
}

function fireNotification(imageurl: string, title: string, message: string) {
  if (!Notification) {
    alert('Notification is not supported by your browser.');
    return; }

  if (Notification.permission !== "granted") Notification.requestPermission();

  let params = {};
  if (imageurl) params.icon = imageurl;
  params.body = message;
  var notification = new Notification(title, params);
  notification.onerror = () => {
    console.error("failed to show notification - " + title + "\n\n" + message);
  }

  notification.onclick = function () {
    window.focus();
    console.log('notification clicked', notification); };
}

function prepareNotification(imageurl, title, message, delay) {
  console.warn('prepareNotification', {imageurl, title, message, delay});
  
  if (!Notification) {
    alert('Notification is not supported by your browser.');
    return; }

  if (Notification.permission !== "granted") Notification.requestPermission();
  setTimeout(() => fireNotification(imageurl, title, message), delay);
}

///////////////////////////////

type Dictionary<K, V> = any;
let i: number;

type TAction = string;

let sec = 1000;
let min = 60*sec;
let hour = 60*min;
let day = 24*hour;
let week = 7*day;
let w = week;
let d = day;
let h = hour;
let m = min;
let s = sec;

let urls: Dictionary<string, string> = {
    'Specialantactions': 'https://i.ibb.co/Nn2p6px/egg3.jpg',
    'Insectactions': 'https://i.ibb.co/nmJr3gm/insectshell.jpg',
    'Cellactions': 'https://i.ibb.co/SK4y8KR/cellbatch.jpg',
    'Hatchactions': 'https://i.ibb.co/H2fg9BM/hatch1.jpg',
    'Germactions': 'https://i.ibb.co/K0t6Qhp/germ.jpg',
    'Geneactions': 'https://i.ibb.co/276dFxR/gene.jpg',

    'Builder+@_1': 'https://i.ibb.co/SVVrJfb/build4.jpg',
    'Evoluer+@_1': 'https://i.ibb.co/CBR1b5Y/dna.jpg',
    'Use@Ants_1': 'https://i.ibb.co/B2g5FWY/ah.jpg',
    'Use@ution_1': 'https://i.ibb.co/tp3mg0J/ae.jpg',
    'Eacheedup_1': 'https://i.ibb.co/hHkYcsH/aall2.jpg',
    'Use@ction_1': 'https://i.ibb.co/tHb7Zmc/ab.jpg',
    'Use@emain_1': 'https://i.ibb.co/ydz0fFr/cr.jpg',
    'RedeeSpore_1': 'https://i.ibb.co/VJ8v9L3/pool.jpg',
    'Use@Spore_1': 'https://i.ibb.co/Hz5NYnP/spores.jpg',
    'Gaini@Exp_1': 'https://i.ibb.co/XYnwHmN/exp.jpg',
    'Use@dEgg_1': 'https://i.ibb.co/hDPRC5M/hatch2.jpg',
    '3Use@yEgg_1': 'https://i.ibb.co/Nn2p6px/egg3.jpg',
    '2Use@yEgg_1': 'https://i.ibb.co/HCVhcqt/egg2.jpg',
    '1Use@yEgg_1': 'https://i.ibb.co/bNPVd9z/egg1.jpg',
    'EnhanStars_1': 'https://i.ibb.co/gwxQcx1/big-enzyme.jpg',

};

class Action{
    static bPower = "Building Power +@";
    static ePower = "Evolution Power +@";
    static aEvo = "Use @ minute Speedup items during Evolution";
    static aBuild = "Use @ minute Speedup items during Construction";
    static aHatch = "Use @ minute Speedup when hatching Soldier Ants";
    static aAny = "Each use of any @ min Speedup";
    static hatch = "Hatch 1 lvl @ Soldier ant";

    static bioEssence = "Consume a Bio-Essence";
    static gainCell = "Obtain a @-star Cell";
    static useCell = "Consume a @-star Cell";
    static useCellFluid = "Consume 1 Cell Fluid @";
    static gainGene = "Obtain a @-star Gene";
    static useGene = "Consume a @-star Gene";
    static useGeneFactor = "Consume a Genetic Factor @";
    static gainGerm = "Obtain a @-star Germ";
    static useGerm = "Consume a @-star Germ";
    static useGermFactor = "Consume a Germ Medium @";


    static cr = "Use @ Creature Remain";
    static getSpore = "Redeem @ Spore";
    static useSpore = "Use @ Spore";
    static gainExp = "Gaining @ Exp";
    static skill = "Unlock @ Skill of any Special Ant";
    static eggLimited = "Use @ Time-limited Egg";
    static egg3 = "Use @ Tertiary Egg";
    static egg2 = "Use @ Secondary Egg";
    static egg1 = "Use @ Primary Egg";
    static enhanceAntStar = "Enhance a Special Ant to @ Stars";
    static insectHatch = "Hatch @ Insect";
    static getInsectFodder = "Make @ Insect Fodder";
    static useInsectFodder = "Use @ Insect Fodder";
    static getInsectShell = "Get @ Insect Shell by Butchering insects";
    static useInsectShell = "Use @ Insect Shell";
    static upgradeInsect = "Upgrade any Insect to @ Stars";

    static insectBatch = "Insect actions";
    static hatchBatch = "Hatch actions";
    static specialBatch = "Special ant actions";
    static cellBatch = "Cell actions";
    static geneBatch = "Gene actions";
    static germBatch = "Germ actions";
}


let startActionBatch: false | true | 2; // false = not in batch, true = in middle of batch, 2 = second of batch
const batchGroups: any = {};

class A{
    static all: A[] = [];
    action: TAction;
    score: number;
    required: number | string;
    isInBatch: boolean | 2;
    prependToKey: string;
    index: number;
    selected: boolean = true;
    constructor(action: TAction, score: number, required: number | string = 1, prependToKey: string | number = '') {
        this.action = action;
        this.score = score;
        this.required = required;
        this.isInBatch = startActionBatch;
        this.prependToKey = '' + prependToKey;
        this.index = A.all.length;
        A.all.push(this); }

    toString(): string {
        return this.action.replaceAll('@', '' + this.required) + " ---> " + this.score; }

    getBox(forceGeneration = false): string {
        if (!forceGeneration && this.isInBatch === true) return '';
        if (this.isInBatch === false) return this.getDetailedBox();
        if (this.isInBatch >= 1) return this.getBatchBox();
        return 'error';
    }

    getScoreTxt(): string {
        let required = +this.required === this.required && this.required > 1 && this.action.indexOf('@') >= 0;
        if (required) return this.score + "/" + this.required;
        return '' + this.score; }

    getDetailedBox(orBatches: boolean = false): string {
        let urlkey =  this.getsrc();
        let imgsrc: string = urls[urlkey];
        let scoretxt = this.getScoreTxt();
        let text: string = this.getText(orBatches);
        let ret = `
                <div class="A single" tabindex="0" data-index="` +  this.index + `">
                    <div class="icon">
                        <img src="` + imgsrc + `" alttodo="MISSING IMAGE:` + urlkey + `" alt=""/>
                        <span class="iconlabel">` + scoretxt + `</span>
                    </div>
                    <div class="overflowtext">
                        <div class="overflowinner">` + text + `</div>
                    </div>
                </div>`;
        return ret as any;
        // return ``;
    }

    getBatchGroup(): A[] { return batchGroups[this.getsrc(false, true)]; }

    getBatchBox(): string {
        let imgsrc: string = this.getsrc(false, true);
        let required = this.action.indexOf('@') >= 0 && this.required;
        let text: string = this.getText(true);
        let ret = `
                <div class="A batchbox" tabindex="0">
                    <div class="icon">
                        <img src="` + imgsrc + `" alttodo="` + text + `" alt=""/>
                        <span class="iconlabel">` + required + `</span>
                    </div>
                    <div class="overflowtext">
                        <div class="overflowinner">` + this.getBatchGroup().reduce((val, a, i) => val + a.getDetailedBox(), '') + `</div>
                    </div>
                </div>`;
        return ret as any; }

    getText(forBatches: boolean = false): string {
        if (forBatches) return '';
        return this.action.replace( /@/, '' + this.required); }

    getsrc(asurl: boolean = false, forBatches: boolean = false): string {
      let imgsrc = this.action.substr(0, 5) + this.action.substr(this.action.length - 5) +
            (forBatches ? "_BATCH" :  '_' + this.required);
      return this.prependToKey + imgsrc.replace(/[\s]+/g, '');
      let key = this.action.replace(/\s/g, '');
      return asurl ? urls[key] : key;     
    }

    setSelected(b: boolean): void {
        this.selected = b;
        // ed è qui che mi sono pentito di non averlo fatto in react-angular
        let nodes = document.querySelectorAll(".A[data-index='" + this.index + "']");
        for (let node of nodes) { // @ts-ignore
            node.dataset.selected = this.selected ? 1 : 0;
        }
    }
}


class CA {
    static all: CA[][] = []; // [time][day]
    static time: number = 0;
    static day: number = 0;
    day: number;
    time: number;
    actions: A[];
    width: number = 1;
    height: number = 1;
    notificationtimer?: number;
    dynamic: {
        peers: CA[];
        text: string;
        html: string;
        src: string;
        occurrences: number;
        color: string;
    } = {} as any;

  constructor (...actions: A[]){
        this.day = CA.day;
        this.time = CA.time;
        this.actions = actions;
        if (CA.time === 7) { CA.time = 0; CA.day++; }
        else CA.time++;
        if (!CA.all[this.time]) CA.all[this.time] = [this];
        else CA.all[this.time][this.day] = this;
    }
  
  togglenotification(notification, cellhtml) {
    console.log('togglenotification', {a:this, timerid: this.notificationtimer});
    if (this.notificationtimer) {
      clearTimeout(this.notificationtimer);
      return;
    }
    this.setnotification(notification, cellhtml);
  }

  setnotification(notification, cellhtml){
    let msginput = cellhtml.querySelector('.notificationmsg');
    let actions = this.actions; // [...cellhtml.querySelectorAll(':scope>.A')].map(h => A.all[h.dataset.index]);
    let batchActions = this.actions.filter( (a) =>a instanceof Batch); // [...cellhtml.querySelectorAll(':scope>.A.batch')].map(h => A.all[h.dataset.index]);
    console.log({actions, ca:this, ids: [...cellhtml.querySelectorAll(':scope>.A')].map(h => h.dataset.index)});

    let foremostaction = batchActions[0] || actions[0];
    let url = foremostaction.getsrc(true);
    let timer = +notification.dataset.timer;
    if (window.debug) timer = 1000;
    let title = msginput?.value || 'Colony action reminder';
    let msg = cellhtml.dataset.notificationtxt;
    this.notificationtimer = prepareNotification(urls[url], title, msg, timer);
    // this.notificationtimer = setTimeout( () => unsetnotification(notification), timer);
  }

  makeCell(): string {
        if (this.dynamic.html) return this.dynamic.html;
        return this.dynamic.html = '<td class="CA_cell" style="background:' + this.dynamic.color + ';" colspan="' + this.width + '" rowspan="' + this.height + '" tabindex="-1" onclick="cellmouseover(this)" onfocus="cellmouseover(this)" onmouseenter="cellmouseover(this)" data-notificationtxt="' + this.toString() + '" data-day="'+this.day+'" data-time="'+this.time+'">' +
            this.actions.reduce((val, a, i) => val + a.getBox(), '') + '<div class="overflowtext timer"><div></div><div class="notification" onclick="notificationclick(this)"></div></td>'
    }

    toString(): string {
        if (this.dynamic.text) return this.dynamic.text;
        return this.dynamic.text = this.actions.map( a => a.getText() ).sort().join(', ');
    }
}

function getcelldistance(cellx, celly, now) {
  if (!now) now = new Date();
  let times = {first:0, second:0, third:0};
  times.first = (cellx)*d + (celly)*h +5*m;
  times.second = times.first + 8*h;
  times.third = times.second + 8*h;
  
  let nowtime = now.getUTCDay()*d + now.getUTCHours()*h + now.getUTCMinutes()*m + now.getUTCSeconds()*s;
  if (nowtime > times.third) nowtime -= 1*w;
  let diff ={w:0, d:0, h:0, m:0, s:0};
  let closesttime;
  if (times.first > nowtime) closesttime = times.first; else
  if (times.second > nowtime) closesttime = times.second; else
  if (times.third > nowtime) closesttime = times.third; else
    closesttime = "error";
  let diffabs = (closesttime - nowtime);
  diff.w = 0;
  diff.d = Math.floor(diffabs / day);
  diff.h = Math.floor((diffabs % day)/h);
  diff.m = Math.floor((diffabs % h)/m);
  diff.s = Math.floor((diffabs % m)/s);
  let retstr = "";
  for (let key in diff) {
    if (diff[key] > 0) retstr += diff[key] + key + " ";
  }
  // console.log("gettcelldistance() ", {cellx, celly, retstr, now, nowtime, times, diff, diffabs});
  return {timer:diffabs, str:retstr.trim()};
}

function cellmouseover(cell): void {
  // console.log('hovering on', cell);
  let cellday = [...cell.parentElement.cells].indexOf(cell);
  let cellhour = [...cell.parentElement.parentElement.rows].indexOf(cell.parentElement);
  // console.log("cell distance:", getcelldistance(cellday, cellhour, now));
  let timer = cell.querySelector('.timer>div');
  let out = {timer:0, str:''};
  out = getcelldistance(cellday, cellhour);
  timer.innerText = out.str;
  let notify = cell.querySelector('.notification');
  notify.dataset.timer = out.timer; 
}

function unsetnotification(notification){
    if (notification.dataset.notificationid) return 
}

function notificationclick(notification){
  // aaaaaaaaaaaaaaaaaa
  let cellhtml = notification;
  // if (notification.dataset.notificationid) return unsetnotification(notification);
  console.log('notificationclick', {notification});
  while (!cellhtml.dataset.notificationtxt) {
    cellhtml = cellhtml.parentElement;
    console.log({cellhtml, parent:cellhtml.parentElement, dataset: cellhtml.dataset});
  }
  let day = cellhtml.dataset.day;
  let hour = cellhtml.dataset.time;
  let ca = CA.all[+hour][+day];
  ca.togglenotification(notification, cellhtml);
}


let hatchpts = [5, 25, 50, 65, 90, 115, 140, 165, 215];
let cellobtainpts = [10000000, 5000000, 2400000, 600000, 100000, 10000];
let cellUsePts = [7000000, 3500000, 1600000, 400000, 60000, 6000];
let cellFluidPts = [10000, 4000, 1000, 200];

let geneobtainpts = [4500000, 3200000, 2100000, 1200000, 500000, 250000, 100000, 40000, 10000];
let geneUsePts = [3150000, 2240000, 1400000, 800000, 300000, 150000, 60000, 24000, 24000, 6000];
let geneFluidPts = [10000, 4000, 1000, 200];

let germObtainpts = [4500000, 3200000, 2100000, 1200000, 500000, 100000, 400000, 10000];
let germUsePts = [3150000, 2240000, 1400000, 800000, 300000, 150000, 60000, 24000, 6000];
let germFluidPts = [10000, 4000, 1000, 200];


let antstarpoints = [6000000, 4800000, 3500000, 3000000, 2000000, 150000];

startActionBatch = true;
i = 10;
const hatchBacth = hatchpts.map( hatchpt => new A(Action.hatch, hatchpt, '' + i--));

let bioessence = new A(Action.bioEssence, 25000);
let cellBatch = [bioessence];
let geneBatch = [bioessence];
let germBatch = [bioessence];

i = 7;
cellBatch = [...cellBatch, ...cellobtainpts.map( hatchpt => new A(Action.gainCell, hatchpt, '' + i--))];
i = 7;
cellBatch = [...cellBatch, ...cellUsePts.map( hatchpt => new A(Action.useCell, hatchpt, '' + i--))];
i = 4;
cellBatch = [...cellBatch, ...cellFluidPts.map( hatchpt => new A(Action.useCellFluid, hatchpt, romanize(i--)))];

i = 10;
geneBatch = [...geneBatch, ...geneobtainpts.map(pt => new A(Action.gainGene, pt, '' + i--))];
i = 10;
geneBatch = [...geneBatch, ...geneUsePts.map(pt => new A(Action.useGene, pt, '' + i--))];
i = 4;
geneBatch = [...geneBatch, ...geneFluidPts.map(pt => new A(Action.useGeneFactor, pt, romanize(i--)))];

i = 10;
germBatch = [...germBatch, ...germObtainpts.map(pt => new A(Action.gainGerm, pt, '' + i--))];
i = 10;
germBatch = [...germBatch, ...germUsePts.map(pt => new A(Action.useGerm, pt, '' + i--))];
i = 4;
germBatch = [...germBatch, ...germFluidPts.map(pt => new A(Action.useGermFactor, pt, romanize(i--)))];



let sporeBatch = [new A(Action.getSpore, 1000), new A(Action.useSpore, 2000)];
let eggBatch = [new A(Action.eggLimited, 200000), new A(Action.egg3, 200000, 1, 3), new A(Action.egg2, 50000, 1, 2), new A(Action.egg1, 10000, 1, 2)]
i = 8;
let antsstarBatch = antstarpoints.map(pt => new A(Action.enhanceAntStar, pt, '' + i--));
let specialAntBatch = [...sporeBatch, new A(Action.gainExp, 1, 10), ...eggBatch, ...antsstarBatch];



let insectBatch = [new A(Action.insectHatch, 200000),
    new A(Action.getInsectFodder, 100), new A(Action.useInsectFodder, 50),
    new A(Action.getInsectShell, 200), new A(Action.useInsectShell, 200),
];

let insectUpgradePts = [10000000, 8000000, 6000000, 4500000, 3000000, 2000000, 1000000, 8000000, 4000000, 2000000];
i = 11;
insectBatch = [...insectBatch, ...insectUpgradePts.map(pts => new A(Action.upgradeInsect, pts, '' + i--))];
// todo: same background to identical CA, merge cell for adiancent identical CA

startActionBatch = false;



class Batch extends A{
    actions: A[];
    constructor(batchName: TAction, actions: A[]) {
        super(batchName, 0, 0);
        this.actions = actions; }

    getBox(forceGeneration: boolean = false): string {
        // return '<div class="A batch">batch: ' + this.action + '</div>';
        let urlkey =  this.getsrc();
        let imgsrc: string = urls[urlkey];
        let scoretxt = this.getScoreTxt();
        let text: string = this.getText();
        let subactions: string = this.actions.reduce( (val, a, i, arr) => val + a.getDetailedBox(), '');
        let ret = `
                <div class="A batch" tabindex="0" data-index="` +  this.index + `">
                    <div class="icon">
                        <img src="` + imgsrc + `" alt="MISSING IMAGE:` + urlkey + `"/>
                        <span class="iconlabel">` + text.substr(0, text.indexOf(' ')) + `</span>
                    </div>
                    <div class="overflowtext">
                        <div class="overflowinner"><h3>` + text + `</h3>
                        <div class="subactions">` + subactions + `</div>
                        </div>
                    </div>
                </div>`;
        return ret as any;
    }

    getsrc(asurl=false): string {
      let key =this.action.replace(/\s/g, '');
      return asurl ? urls[key] : key;
    }
}




const bp1000 = new A(Action.bPower, 1000);
const ep400 = new A(Action.ePower, 400);
const ae800 = new A(Action.aEvo, 800);
const ae400 = new A(Action.aEvo, 400);
const aany400 = new A(Action.aAny, 400);
const ah400 = new A(Action.aHatch, 400);
const ab400 = new A(Action.aBuild, 400);
const ab900 = new A(Action.aBuild, 900);
const cr700 = new A(Action.cr, 700);





let _hatchBatch: Batch = new Batch(Action.hatchBatch, hatchBacth);
let _specialBatch: Batch = new Batch(Action.specialBatch, specialAntBatch);
let _insectBatch: Batch = new Batch(Action.insectBatch, insectBatch);
let _cellBatch: Batch = new Batch(Action.cellBatch, cellBatch);
let _geneBatch: Batch = new Batch(Action.geneBatch, geneBatch);
let _germBatch: Batch = new Batch(Action.germBatch, germBatch);



// monday
new CA(bp1000);
new CA(ep400, ae800);
new CA(bp1000);
new CA(aany400);
new CA(ep400, bp1000);
new CA(bp1000, ab900);
new CA(bp1000, ep400, _hatchBatch);
new CA(bp1000, ep400, _hatchBatch);

// tuesday
new CA(bp1000, ab900);
new CA(bp1000, _cellBatch);
new CA(ah400);
new CA(bp1000, _hatchBatch, _cellBatch);
new CA(ab400, ah400, ae400);
new CA(bp1000, ep400, ah400, _cellBatch);
new CA(ep400, bp1000, _hatchBatch);
new CA(bp1000, _cellBatch);

// wednesday
new CA(bp1000, ab900);
new CA(ep400, ae800, cr700);
new CA(ah400);
new CA(ep400, bp1000, cr700);
new CA(bp1000, _hatchBatch);
new CA(ah400, ae400, ab400, cr700);
new CA(bp1000, ep400, ah400);
new CA(ah400, ae400, ab400, cr700);

// thursday
new CA(bp1000, ab900);
new CA(_specialBatch);
new CA(ab400, ah400, ae400);
new CA(_specialBatch);
new CA(aany400);
new CA(_specialBatch);
new CA(ep400, bp1000, ah400);
new CA(_specialBatch);

// friday
new CA(aany400);
new CA(ah400, ae400, ab400, _geneBatch);
new CA(bp1000, ep400, ah400);
new CA(ah400, _geneBatch);
new CA(ep400, bp1000, ah400);
new CA(bp1000, _hatchBatch, _geneBatch);
new CA(ep400, _hatchBatch);
new CA(aany400, _geneBatch);

// saturday
new CA(aany400);
new CA(ep400, ae800, _germBatch);
new CA(bp1000, ab900);
new CA(ah400, _germBatch);
new CA(ep400, bp1000, ah400);
new CA(ep400, bp1000, ah400, _germBatch);
new CA(bp1000, _hatchBatch);
new CA(ep400, _hatchBatch, _germBatch);

// sunday
new CA(bp1000, ab900);
new CA(aany400, _insectBatch);
new CA(ab400, ah400, ae400);
new CA(ep400, ae800, _insectBatch);
new CA(aany400);
new CA(ah400, _insectBatch);
new CA(ep400, bp1000, ah400);
new CA(aany400, _insectBatch);



function assignFrequencyColors(colorlist: string[] = ['#146152', '#44803F', '#B4CF66', '#FFEC5C', '#FF5A33']){
    let allCA: CA[] = CA.all.flat();
    // allCA = allCA.sort( (c1, c2) => c1.toString().localeCompare(c2.toString()));
    let actiondictionary: Dictionary<string, {counter: number, list: CA[]}> = {};
    for (let ca of allCA) {
        let key = ca.toString();
        let occurrence: {counter: number, list: CA[]} = actiondictionary[key] ||  {counter: 0, list: []};
        if (occurrence) { occurrence.counter++; occurrence.list.push(ca); }
        actiondictionary[key] = occurrence;
    }
    for (let ca of allCA) {
        let occurrences: {counter: number, list: CA[]} = actiondictionary[ca.toString()];
        ca.dynamic.peers = occurrences.list;
        ca.dynamic.occurrences = occurrences.counter;
    }
    let sortableCA: Dictionary<string, {counter: number, list: CA[]}> = {};
    for (let key in actiondictionary) {
        sortableCA[actiondictionary[key].counter + '_' + key] = actiondictionary[key];
    }
    let sortedKeys = Object.keys(sortableCA).sort( (k1, k2) => k2.localeCompare(k1));
    for (let i = 0; i < colorlist.length; i++) {
        let key = sortedKeys[i];
        for (let ca of sortableCA[key].list) ca.dynamic.color = colorlist[i];
    }
}

function assignSizes() {}
let days = ['Time', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

function toTime(time: number): string {
    if (time < 10) return '0' + time;
    return '' + time; }

function getTimeSpans(time: number): string {
    let times = '';
    for (let i = 0; i < 3; i++)
        times += '<div class="timespan">' + toTime(i*8 + time) + ' ~ ' + toTime(i*8 + time+1) + '</div>';
    return '<th class="time">' + times + '</th>'; }

function objectFlip<A=string|number, B=string|number>(obj: Dictionary<A, B>): Dictionary<B, A[]> {
    return Object.keys(obj).reduce((ret: Dictionary<B, A>, key) => {
        if (ret[obj[key]]) ret[obj[key]].push(key);
        else ret[obj[key]] = [key];
        return ret;
    }, {} as Dictionary<B, A>);
}

function makeSummary(outObj: {nonNestedActions: A[]}): string {
    let nonNestedActions = CA.all.flat().flatMap( (ca: CA) => ca.actions);
    let actionFrequency: Dictionary<number/*index*/, number/*freq*/> = {};
    for (let a of nonNestedActions) {
        actionFrequency[a.index] = (actionFrequency[a.index] || 0) + 1;
    }
    outObj.nonNestedActions = nonNestedActions;
    let frequencyAction: Dictionary<number/*freq*/, number[]/*indexes*/> = objectFlip(actionFrequency);
    let sortedNonNestedActions = Object.keys(frequencyAction).sort( (freq1, freq2) => +freq2 - +freq1).flatMap( (freq) => (frequencyAction[freq] as number[]).map( (i) => A.all[i]));
    console.log({nonNestedActions, actionFrequency, frequencyAction, sortedNonNestedActions});
    let sidebar = '<section class="sidebar"><h3 style="width: 100%; text-align:center">Filters</h3>' + sortedNonNestedActions.reduce((val: string, a: A) => val + '<div class="filter" tabindex="0">' + a.getBox() + '</div>', '')+ '</section>';
  
  return sidebar; // "<section>" + sidebar+guide + "</section>";
}
function makeguide() {
  return "<section class=\"guide\"><h3>Functionalities:</h3><ul>" +
  "<li>Click on day to hide it</li>" +
  "<li>Click on a bell to activate a notification for that CA</li>" +
  "<li>Click on an action on the right side to filter CA containing that actions</li>" +
  "</ul></section>";
}
function makeheader() {
  return "<section class=\"header\">update: notifications should work if you enable in your browser. use the bell button.</section>";
}

function makegui(): string {
    let ca: CA[][] = CA.all;
    let out: {nonNestedActions: A[]} = {} as any;
    var table = `<table class="CA_table">
                <thead>` + days.reduce((val, elem) => val + '<th onclick="hideday(this)">' + elem + '</th>', '') + `</thead>
                <tbody>` +
                    CA.all.reduce( (dayval, caday) => {
                        let ret = dayval + '<tr class="CA_row">' + getTimeSpans(caday[0].time);
                        ret += caday.reduce( (val, ca) => val + ca.makeCell(), '');
                        // if (i === arr.length)
                        ret+= '</tr>';
                        return ret;
                    }, '') +
                    `</tbody></table>`;


  let summary = makeSummary(out);
  let header = makeheader();
  let functions = makeguide();
    document.body.innerHTML = header + "<section>" + table + summary + "</section>" + functions;
    for (let elem of document.querySelectorAll('.filter .A')) {
        elem.addEventListener('click', (e: Event) => {
            if (!e || !e.target) return;
            let eventElement: HTMLElement | null = e.target as HTMLElement;
            
            while (eventElement && !eventElement.classList.contains('A')){
              console.log('evt elem:', {eventElement, parent: eventElement.parentElement});
              eventElement = eventElement.parentElement;
            }
            if (!eventElement) return;
            let index: number = +(eventElement.dataset.index || -1);
            let aa = A.all[index];
            console.log('clicked:', {index, aa, eventElement, e});

            if (out.nonNestedActions.filter( a => !a.selected).length === 0) {
                // if all selected, i unselect all the others
                for (let a of out.nonNestedActions) {
                    a.setSelected(false);
                }
            }
            aa.setSelected(!aa.selected);
            if (out.nonNestedActions.filter( a => a.selected).length === 0) {
                // if none selected, i select all the others
                for (let a of out.nonNestedActions) {
                    a.setSelected(true);
                }
            }
        });
    }

    return table; }

function highlightCurrentAction(time: Date = null): void {
  if (!time) time = new Date();
  let minutes = time.getMinutes();
  let isEmpty = minutes < 5;
  let hour = time.getUTCHours() % 8;
  let day = time.getUTCDay() || 7;
  let table = document.querySelector('.CA_table');
  for (let leftover of table.querySelectorAll('.active_now')) leftover.classList.remove('active_now');
  for (let leftover of table.querySelectorAll('.preparing')) leftover.classList.remove('preparing');
  let hourrow = table.rows[hour + 1];
  let daycells = [...table.rows].map( r => r.cells[day]);
  let nowcell = daycells[hour + 1];
  // console.log('nowcell:', {nowcell, daycells, hour, day});
  nowcell.classList.add(isEmpty ? 'preparing' : 'active_now');
  if (minutes < 5)
    setTimeout(highlightCurrentAction, (5-minutes) * 60*1000);
  else 
    setTimeout(highlightCurrentAction, (60-minutes) * 60*1000);
}
function updatetimers() {
  
}

function hideday(headercell) {
  let hide = !headercell.classList.contains('hiddenday');
  let column = [...headercell.parentElement.cells].indexOf(headercell);
  let table = document.querySelector('.CA_table');
  let daycells = [...table.rows].map( r => r.cells[column]);
  for (let cell of daycells) {
    if (cell.classList.contains('hiddenday'))
      cell.classList.remove('hiddenday');
      else cell.classList.add('hiddenday');
  }
}

function main() {
  assignFrequencyColors();
  assignSizes();
  makegui();
  
  let time = new Date();
  highlightCurrentAction(time);
  
  var myWorker = new Worker('//damianonaraku.github.io/disbot/ca_service_worker.js');

  
}


window.docReady(main);
 //let a = 0;
