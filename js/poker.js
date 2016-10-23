Sum=10000

Deck=new Array()
Pairs=new Array()
CardNames=new Array()
Suites=new Array("s","h","c","d")
Count=new Array()
Player=new Array()
Dealer=new Array()
Causes=new Array(
"Четыре пары","Флеш","Стрит","Фулл хаус",
"Три пары","Больше пар","Выше пара",
"Выше карта","Выше карта","Выше карта","Выше карта","Выше карта"
)


function Init(){
Done=0
Bet=0
c=1
i=0
for(s=0;s<4;s++){
for(x=7;x<15;x++){
Pairs[x]=0
CardNames[i]=Suites[s]+x
Deck[i]=0
i++
}
}
for(x=0;x<5;x++){
document["Deal"+x].src="images/blnk.gif"
document["Card"+x].src="images/blnk.gif"
}
InDeck=28
document.Form.PlayerHand.value="Выберите сумму ставки, чтобы начать раунд\nДеньги: $"+Sum
document.Form.Button.value="Выйти"
}



function Pick(){
InDeck--
if(InDeck<1){
alert("Нет больше карт!")
return
}
ran=Math.floor(Math.random()*28)
while(Deck[ran]==1){
ran=Math.floor(Math.random()*28)
}
Deck[ran]=1
return ran
}




function Deal(){
Init()
for(x=0;x<5;x++){
Player[x]=CardNames[Pick()]
document["Card"+x].src=(x<2)?("images/"+Player[x]+".gif"):"images/done.gif"
Dealer[x]=CardNames[Pick()]
document["Deal"+x].src=(x==1)?("images/"+Dealer[x]+".gif"):"images/done.gif"
}
}

function NextDraw(Amt){
if(Done==1)return
Sum=Sum-parseInt(Amt)
Bet+=parseInt(Amt)

c++
if(c>4) Finalise()
else{
document["Card"+c].src="images/"+Player[c]+".gif"
document["Deal"+c].src="images/"+Dealer[c]+".gif"
document.Form.PlayerHand.value="Bet : $"+Bet
document.Form.PlayerHand.value+=(c<4)?"\nВыберите сумму ставки, чтобы получить карту":"\nВыберите сумму ставки, чтобы вскрыться"
document.Form.PlayerHand.value+="\nДеньги: $"+Sum
}
}


function Finalise(){
Done=1
for(x=0;x<5;x++){
document["Deal"+x].src="images/"+Dealer[x]+".gif"
}
DealScore=SortHand(Dealer)
PlayScore=SortHand(Player)
sc=0
while(PlayScore[sc]==DealScore[sc])sc++
if(PlayScore[sc]>DealScore[sc]){
Final="Вы победели $"+Bet+"!( У вас есть "
Sum=Sum+Bet*2

}
else{
Final="Вы проиграли $"+Bet+"! ( У Дилера есть "
}
document.Form.PlayerHand.value=Final+Causes[sc]+" )\nДеньги: $"+Sum+"\nНажмите След. чтобы сыграть другой раунд"
if(Sum<100||Sum>100000) GameOver()
document.Form.Button.value="След."
}


function Quit(comt){
Done=1
if(comt=="Выйти"){
Sum=Sum-Bet
if(Sum<100) GameOver()
document.Form.PlayerHand.value="Не беспокойтесь! Вы проиграли $"+Bet+"\nДеньги : $"+Sum+"\nНажмите След. чтобы сыграть другой раунд"
document.Form.Button.value="След."
}
if(comt=="След."){
Deal()
}
}

function Order(num1,num2){
if(parseInt(num1)<parseInt(num2)) return 1
if(parseInt(num1)>parseInt(num2)) return -1
if(parseInt(num1)==parseInt(num2)) return 0
}

Hand=new Array("Player","Dealer")
h=0
function SortHand(Arr){
h=(h==1)?0:1

Flush=0
CntF=0
for(x=1;x<5;x++){
if(Arr[0].charAt(0)==Arr[x].charAt(0))CntF++
}
if(CntF>3){
Flush=parseInt(Arr[4].substring(1,Arr[4].length))
}


A=Arr
for(x=0;x<5;x++){
A[x]=parseInt(Arr[x].substring(1,Arr[x].length))
}
A=A.sort(Order)


for(y=0;y<52;y++){
Count[y]=0
for(x=0;x<5;x++){
if(A[x]==y) Count[y]++
}
}

Pair=0
Tripl=0
FullHouse=0
Quad=0
HavePair=0
Straight=0
TopPair=0

for(y=0;y<52;y++){
if(Count[y]==2){
Pair++
TopPair=y
HavePair=1


}
if(Count[y]==3){
Tripl=y
HavePair=1

if(Pair>0) FullHouse=Tripl
}
if(Count[y]==4){
Quad=y
HavePair=1

}
}


if(HavePair==0){
Gap=A[0]-A[4]
if(Gap==4){
Straight=A[0]

}
}

Score=new Array()
Score[0]=Quad
Score[1]=Flush
Score[2]=Straight
Score[3]=FullHouse
Score[4]=Tripl
Score[5]=Pair
Score[6]=TopPair
Score[7]=Arr[0]
Score[8]=Arr[1]
Score[9]=Arr[2]
Score[10]=Arr[3]
Score[11]=Arr[4]
return Score
}

function GameOver(){
Saying=(Sum<100)?"Вы потеряли все деньги!\nИграть снова?":"Вы получили $ 100000!\nВы должно быть мастер покера!\nИграть снова?"
location=confirm(Saying)?"index.html":window.close();
}