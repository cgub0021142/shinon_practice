//在pc模式下，click link的時候，我不要讓navbar collapse，這邊宣告計數器
let linkMoving = 0;
let transitionTime = 300

// navbar collapse when you scroll down
let previousScrollTop = 0;
document.addEventListener('scroll', function (e) {
	let navbar = document.querySelector('header.navbar')
	let nowScrollTop = document.querySelector('html').scrollTop
	// console.log('nowScrollTop',nowScrollTop)
	if(nowScrollTop >= previousScrollTop && !linkMoving){
		// console.log('previousScrollTop:', previousScrollTop)
		// console.log('nowScrollTop',nowScrollTop)
		navbar.classList.add('collapse')
		
	}
	else
		navbar.classList.remove('collapse')
	previousScrollTop = nowScrollTop
}, { passive: true })
document.querySelector('.hamburger').addEventListener('click', function () {
	document.querySelector('header.navbar').classList.toggle('active');
	document.querySelector('body').classList.toggle('noScrollBar');
})

//手機模式下，點連結後，active選單要關閉
document.querySelectorAll('.navLink').forEach(link => {
	link.addEventListener('click', function () {
		let hamburger = document.querySelector('header.navbar')
		let classList = hamburger.classList;
		if (classList.contains('active'))
			hamburger.classList.remove('active');
	})
})

//跳轉過來跳到指定位置，目前不知道為甚麼，scroll-behavior: smooth會lag。
//所以手寫
//下面這一段還有加保護機制，如果你手賤兩個link一直來回點，要另外寫機制讓navbar不會collapse
//這邊會用到上面抓進來的jquery
function movingCnt() {
	setTimeout(() => {
		linkMoving--;
	}, 100);
}

$("a[href*='#']").click(function () {
	if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') )
	{
		let target = $(this.hash);
		let headerHight = $('header.navbar').outerHeight();
		let position = target.offset().top - headerHight;
		linkMoving++;
		$("html").animate({ scrollTop: position },
			{
				duration: transitionTime,
				complete: movingCnt
			});
	// $('html').scrollTop(position)
	}
});