(function () {
	let navbar = document.querySelector('header.navbar')
	//在pc模式下，click link的時候，我不要讓navbar collapse，這邊宣告計數器
	let linkMoving = 0;
	let transitionTime = 300
	let collapseCheckingInterval = 100

	// navbar collapse when you scroll down
	let top__when__scrolldown = 0
	let previousScrollTop = 0;
	let timerID = null
	let timerForchecking = null
	let nowScrollTop = 0;
	document.addEventListener('scroll', function (e) {

		let windowH = window.innerHeight
		//頁面的高度百分比做threshold
		let scrollDownThreshold = windowH * .2;
		nowScrollTop = document.querySelector('html').scrollTop
		if (nowScrollTop >= previousScrollTop && !linkMoving) {
			if (!timerID) {
				timerID = setInterval(() => {
					if (nowScrollTop - top__when__scrolldown > scrollDownThreshold)
						navbar.classList.add('collapse')
				}, collapseCheckingInterval);
				timerForchecking = setTimeout(() => {
					clearInterval(timerID)
				}, 3000);
			}
		}
		else {
			navbar.classList.remove('collapse')
			if (timerID) {
				clearInterval(timerID)
				timerID = null
				clearTimeout(timerForchecking)
				timerForchecking = null
			}
		}

		if (previousScrollTop > nowScrollTop) {
			top__when__scrolldown = nowScrollTop
			previousScrollTop = nowScrollTop
		}
		else
			previousScrollTop = nowScrollTop
	}, { passive: true })
	document.querySelector('.hamburger').addEventListener('click', function () {
		navbar.classList.toggle('active');
		document.querySelector('body').classList.toggle('noScrollBar');
	})

	//手機模式下，點連結後，active選單要關閉
	document.querySelectorAll('.navLink').forEach(link => {
		link.addEventListener('click', function () {
			let classList = navbar.classList;
			if (classList.contains('active'))
				navbar.classList.remove('active');
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
		if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '')) {
			let target = $(this.hash);
			// let paddingTop = target.innerHeight() - target.height();
			let paddingTop = target.css('padding-top')
			let headerHight = $('header.navbar').outerHeight();
			let position = target.offset().top - headerHight + paddingTop;
			linkMoving++;
			$("html").animate({ scrollTop: position },
				{
					duration: transitionTime,
					complete: movingCnt
				});
			// $('html').scrollTop(position)
		}
	});
})()