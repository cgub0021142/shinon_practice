// vanilla 複雜版，card顯示由多標籤決定。 規則要用and還是or只要改下面selection array，.some或.every
const sortingNav = document.querySelectorAll('.news .navLink');
let selection = []
function selectionUpdate() {
	selection = []
	sortingNav.forEach((el, idx) => {
		if (idx !== 0) {
			let key = el.dataset.filterType
			if (el.classList.contains('active'))
				selection.push(key);
		}
	})
}


sortingNav.forEach(function (el) {
	el.addEventListener('click', function () {
		let cardShow = this.classList.toggle('active')

		// let cardType = this.dataset.filterType;
		let cards = document.querySelectorAll('.card')
		if (this.innerText === 'ALL' && cardShow) {
			cards.forEach(function (el, idx) {
				el.classList.remove('card-hide')
			})
			sortingNav.forEach((el, idx) => {
				if (idx !== 0)
					el.classList.remove('active')
			})
		}
		else {
			selectionUpdate()
			cards.forEach(el => {
				if (selection.every(selected =>
					el.getElementsByClassName(selected).length > 0))
					el.classList.remove('card-hide')
				else
					el.classList.add('card-hide')
			})
			sortingNav[0].classList.remove('active')
		}
	})
})

// //jq 簡單版，card分類只看一種tag。
// let cardType;
// $('.news .navLink').click(function () {
// 	$(this).parents('.navList').find('.navLink.active').removeClass('active')
// 	$(this).addClass('active')
// 	cardType = $(this).data('filterType')
// 	if (cardType === 'ALL') {
// 		$('.card').each(function (idx, el) {
// 			$(el).removeClass('card-hide')
// 		})
// 	}
// 	else {
// 		$('.card').each(function (idx, el) {
// 			if ($(el).find(`.${cardType}`).length)
// 				el.classList.remove('card-hide');
// 			else
// 				el.classList.add('card-hide');
// 		})
// 	}
// })
//如果從別的頁面按近來，也要讓頁面帶有filter 功能，目前想到最簡單的就是加在url上，或是用query
document.addEventListener("DOMContentLoaded", function () {
	// DOM Ready!
	let querys = new URLSearchParams(document.location.search);
	let filterType = querys.get('filter')
	const mylink = document.querySelector(`[data-filter-type=${filterType}]`)
	mylink.click()
});