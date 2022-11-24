//assigning constant variables
const burgerOpenBtn = document.querySelector('.burger-menu')
const burgerCloseBtn = document.querySelector('.burger-close')
const navigation = document.querySelector('.nav')
const navLinks = document.querySelectorAll('.nav__link')
const backdrop = document.querySelector('.backdrop')
const body = document.querySelector('body')

const accountBtns = document.querySelectorAll('.account-btn')
//function for showing the content
function backdropShow() {
  backdrop.classList.add('show')
  body.classList.add('unscrollable')
}
//function for hiding the content
function backdropHide() {
  backdrop.classList.remove('show')
  body.classList.remove('unscrollable')
}

backdrop.addEventListener('click', (event) => {
  if (event.target === backdrop) {
    navigation.classList.remove('open');
    backdropHide()
  }
})

//================== Open burger menu
burgerOpenBtn.addEventListener('click', () => {
  navigation.classList.add('open')
  backdropShow()
})

//================== Close burger menu
burgerCloseBtn.addEventListener('click', () => {
  navigation.classList.remove('open')
  backdropHide()
})

navLinks.forEach((navLink) => {
  navLink.addEventListener('click', () => {
    navigation.classList.remove('open')
    backdropHide()
  })
})

//================== Slider

const carousel = document.querySelector('.carousel')

const slideLeft = document.querySelector('.slide-left')
const slideActive = document.querySelector('.slide-active')
const slideRight = document.querySelector('.slide-right')

const slides = document.querySelectorAll('.carousel__item')
const sliderPagination = document.querySelector('.carousel-pagination')
const paginationDotz = document.querySelectorAll('.carousel-pagination__item')
const sliderArrows = document.querySelector('.carousel-arrows')

const destinations = [
  {
    country: 'spain',
    index: 0,
  },
  {
    country: 'japan',
    index: 1,
  },
  {
    country: 'usa',
    index: 2,
  },
]

const removeEventListeners = () => {
  slideLeft.removeEventListener('click', moveLeft)
  slideRight.removeEventListener('click', moveRight)
  sliderPagination.removeEventListener('click', dotzClickHandler)
  sliderArrows.removeEventListener('click', sliderArrowsClickHandler)
}

const getScrollValue = () => {
  const carouselWidth = carousel.scrollWidth
  const slideWidth = slideActive.clientWidth
  const carouselSlidesLength = carousel.children.length
  const carouselGap =
    (carouselWidth - slideWidth * carouselSlidesLength) /
    (carouselSlidesLength - 1)

  return slideWidth + carouselGap
}

const moveLeft = () => {
  removeEventListeners()

  const moveValue = getScrollValue()

  carousel.classList.add('moveLeft')
  carousel.style.transform = `translateX(${moveValue}px)`
}

const moveRight = () => {
  removeEventListeners()

  const moveValue = getScrollValue()

  carousel.classList.add('moveRight')
  carousel.style.transform = `translateX(-${moveValue}px)`
}

const setSliderImgs = (direction) => {
  let destination
  let destinationsArray

  if (direction === 'left') {
    destination = destinations.pop()
    destinations.unshift(destination)
  } else {
    destination = destinations.shift()
    destinations.push(destination)
  }

  destinationsArray = destinations
    .slice(destinations.length - 2)
    .concat(destinations)

  slides.forEach((slide, index) => {
    const slidePicture = slide.children[0].children[0]
    const slideImage = slide.children[0].children[1]
    const slideName = slide.children[1]

    slidePicture.srcset = `images/destinations-${destinationsArray[index].country}-360x210.jpg`;
    slideImage.src = `images/destinations-${destinationsArray[index].country}-800x800.jpg`;
    slideImage.alt = destinationsArray[index].country;
    slideName.innerHTML = destinationsArray[index].country;
  })
}

const setActiveDot = () => {
  const activeDotIdx = destinations[0].index

  paginationDotz.forEach((dot, index) => {
    if (index === activeDotIdx) {
      dot.classList.add('carousel-pagination__item_active')
    } else {
      dot.classList.remove('carousel-pagination__item_active')
    }
  })
}

const dotzClickHandler = (event) => {
  const currentDot = event.target
  const currentDotIdx = parseInt(event.target.dataset.idx)
  const currentSlideIdx = destinations[0].index

  if (
    !currentDot.classList.contains('carousel-pagination__item') ||
    currentDotIdx === currentSlideIdx
  )
    return

  if (currentDotIdx > currentSlideIdx) {
    if (currentDotIdx === destinations.length - 1 && currentSlideIdx === 0) {
      moveLeft()
    } else {
      moveRight()
    }
  } else if (currentDotIdx < currentSlideIdx) {
    if (currentDotIdx === 0 && currentSlideIdx === destinations.length - 1) {
      moveRight()
    } else {
      moveLeft()
    }
  }
}

const sliderArrowsClickHandler = (event) => {
  const arrow = event.target

  if (arrow.classList.contains('left')) {
    moveLeft()
  } else if (arrow.classList.contains('right')) {
    moveRight()
  }
}

slideLeft.addEventListener('click', moveLeft)

slideRight.addEventListener('click', moveRight)

carousel.addEventListener('transitionend', () => {
  if (carousel.classList.contains('moveLeft')) {
    setSliderImgs('left')
    carousel.classList.remove('moveLeft')
  } else {
    setSliderImgs('right')
    carousel.classList.remove('moveRight')
  }

  carousel.style.transform = ''

  setActiveDot()

  slideLeft.addEventListener('click', moveLeft)
  slideRight.addEventListener('click', moveRight)
  sliderPagination.addEventListener('click', dotzClickHandler)
  sliderArrows.addEventListener('click', sliderArrowsClickHandler)
})

sliderPagination.addEventListener('click', dotzClickHandler)

sliderArrows.addEventListener('click', sliderArrowsClickHandler)

