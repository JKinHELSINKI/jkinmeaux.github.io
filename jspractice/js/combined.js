/*
ダークモード
*/
//変数 の作成。dateに現在の日時を入れて、hourで時間のみ取り出す。
var date=new Date(),
hour=date.getHours();

//現在時刻を判定して、最初のダークモードを設定する。
//hourの値が16以上もしくは、6以下ならbodyにdarkmodeクラスを追加。
if(hour>=16||hour<=6) {
  $('body').attr('id','darkmode');
  $('.darkmodebutton').hide();
  var darkmode=true;
}else{
  $('.lightmodebutton').hide();
  var darkmode=false
}

//ダークモードスイッチ。id="darkmodebutton"がついたボタンが押されたら、bodyのdarkmodeクラスをトグルする。
$('.darkmodebutton').click(function(){
  $('body').attr('id','darkmode');
  $(this).hide();
  $('.lightmodebutton').show();
});

$('.lightmodebutton').click(function(){
  $('body').attr('id','');
  $(this).hide();
  $('.darkmodebutton').show();
});

/*
粒子タイポグラフィー
*/
(function( $ ) {
  $.fn.particleText = function(options) {
  			var target = "";
  			if(this[0].className){
  				target = "." + this[0].className;
  			}
  			if(this[0].id){
  				target = "#" + this[0].id;
  			}
        var canvas = document.querySelector(target);
        var ctx = canvas.getContext("2d");
        var ww = canvas.width = canvas.clientWidth;
        var wh = canvas.height = canvas.clientHeight;
  			var text = "";
  			var easing = 0.09;

  			if(options.speed){
  				if(options.speed == "middle"){
  					easing = 0.07;
  				}
  				else if(options.speed == "slow"){
  					easing = 0.04;
  				}
  				else if(options.speed == "high"){
  					easing = 0.09;
  				}
  			}
  			if(options.text){
  				text = options.text;
  			} else {
  				text = options;
  			}
  			var colors = ["#F54064","#F5D940", "#18EBF2"];
  			if(options.colors){
  				colors = options.colors;
  			}
  			var flg = false;
  			if (text.indexOf("<br>") != -1) {
  				flg = true;
			}
			var particles = [],num = 0;
			function Particle(ax,ay){
			    this.x =  Math.random()*ww;
			    this.y =  Math.random()*wh;
			    this.goal = {
			        x : ax,
			        y: ay
			    };
			    this.r = canvas.clientWidth / 2 * 0.003;
			    this.color = colors[Math.floor(Math.random() * colors.length)];
			}
			Particle.prototype.render = function() {
				this.x += (this.goal.x - this.x) * easing;
			        this.y += (this.goal.y - this.y) * easing;
				ctx.fillStyle = this.color;
			    ctx.beginPath();
				ctx.arc(this.x, this.y, this.r, Math.PI * 2, false);
			    ctx.fill();

			}
			function initScene(){
				var ww = canvas.width = canvas.clientWidth;
				var wh = canvas.height = canvas.clientHeight;
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				var fSize = 10;
				ctx.font = "bold "+(ww/fSize)+"px sans-serif";
				ctx.textAlign = "center";
				if(!flg){
					drawOneText();
				} else {
					drawManyLineText();
				}
				function drawOneText(){
					var hp = 2;
				    if(canvas.height <= 300 && canvas.width > 768){
				    	hp = 1.5;
				    }
				    ctx.fillText(text, ww/2, wh/hp, ww);
				}
				function drawManyLineText(){
				  var tagetString = text;
					var br = "<br>";
					var arrayStrig = tagetString.split("<br>");
					var height = wh / arrayStrig.length;
					var line = arrayStrig.length;
					var _brakeP = 768;
					var h = 0.8;
					for(var i = 0; i<arrayStrig.length; i++){
						ctx.fillText(arrayStrig[i], ww/2, height * h);
						h+= (ww/1300);
					}
				}
			    var data  = ctx.getImageData(0, 0, ww, wh).data;
			    ctx.clearRect(0, 0, canvas.width, canvas.height);
			    ctx.globalCompositeOperation = "source-over";
			    particles = [];
			    for(var i=0; i<ww; i+=Math.round(ww/200)){
			        for(var j=0;j<wh; j+=Math.round(ww/200)){
			            if(data[ ((i + j*ww)*4) + 3] > 150){
			                particles.push(new Particle(i,j));
			            }
			        }
			    }
			    num = particles.length;
			}
			function render(a) {
			    requestAnimationFrame(render);
			    ctx.clearRect(0, 0, canvas.width, canvas.height);
			    for (var i = 0; i < num; i++) {
			        particles[i].render();
			    }
			};
			window.addEventListener("resize", initScene);
			initScene();
			requestAnimationFrame(render);
	};
})(jQuery);
if(darkmode){
  var colors4ParticleTypography=["#fff","#ccc", "#ddd"];// パーティクルの色を複数指定可能
}else{
  var colors4ParticleTypography=["dimgray","gray"];
}
$(".particletypography").particleText({
  text:"粒子タイポグラフィー", // 表示させたいテキスト。改行の場合は<br>追加
  colors:colors4ParticleTypography,
  speed:"high",  // slow, middle, high の3つから粒子が集まる速さを選択
});

/*
下ふわアニメーション
*/
$(function(){
	var effect_pos = 300; // 画面下からどの位置でフェードさせるか(px)
	var effect_move = 50; // どのぐらい要素を動かすか(px)
	var effect_time = 800; // エフェクトの時間(ms) 1秒なら1000

	// フェードする前のcssを定義
	$('.shitafuwa').css({
			opacity: 0,
			transform:'translateY('+ effect_move +'px)',
			transition: effect_time + 'ms'
	});

	// スクロールまたはロードするたびに実行
	$(window).on('scroll load', function(){
			var scroll_top = $(this).scrollTop();
			var scroll_btm = scroll_top + $(this).height();
			effect_pos = scroll_btm - effect_pos;

			// effect_posがthis_posを超えたとき、エフェクトが発動
			$('.shitafuwa').each(function() {
					var this_pos = $(this).offset().top;
					if ( effect_pos > this_pos ) {
							$(this).css({
									opacity: 1,
									transform: 'translateY(0)'
							});
					}
			});
	});
});

/*
ゆらゆら
*/
jQuery( function() {
	jQuery.fn.yurayura = function( config ){
		var obj = this;
		var i = 0;
		var defaults = {
			'move' : 5,
			'duration' : 1000,
			'delay' : 0
		};
		var setting = jQuery.extend( defaults, config );
		( function move() {
			i = i > 0 ? -1 : 1;
			var p = obj.position().top;
			jQuery( obj )
				.delay( setting.delay )
				.animate( { top : p + i * setting.move }, { 
					duration : setting.duration,
					complete : move
				});
		})();
	};
});