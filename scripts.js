// QUOTES CAROUSEL
function createQuoteSlide(quote) {
    const { pic_url, name, title, text } = quote;

    const slide = $('<div>').addClass('carousel-item');
    const row = $('<div>').addClass('row mx-auto align-items-center').appendTo(slide);
    const imgCol = $('<div>').addClass('col-12 col-sm-2 col-lg-2 offset-lg-1 text-center').appendTo(row);
    const img = $('<img>').attr({
        'src': pic_url,
        'alt': 'Carousel Pic'
    }).addClass('d-block align-self-center').appendTo(imgCol);
    const textCol = $('<div>').addClass('col-12 col-sm-7 offset-sm-2 col-lg-9 offset-lg-0').appendTo(row);
    const quoteText = $('<div>').addClass('quote-text').appendTo(textCol);
    const p = $('<p>').addClass('text-white').text(text).appendTo(quoteText);
    const h4 = $('<h4>').addClass('text-white font-weight-bold').text(name).appendTo(quoteText);
    const span = $('<span>').addClass('text-white').text(title).appendTo(quoteText);

    return slide;
}

$(document).ready(function () {
    const carouselInner = $('.carousel-inner');
    const loader = $('.loader');

    loader.show();

    $.ajax({
        url: 'https://smileschool-api.hbtn.info/quotes',
        type: 'GET',
        success: function (quotes) {
            loader.hide();
            carouselInner.empty();

            $.each(quotes, function (index, quote) {
                const slide = createQuoteSlide(quote);
                if (index === 0) {
                    slide.addClass('active');
                }
                carouselInner.append(slide);
            });
        },
        error: function (error) {
            loader.hide();
            console.error('Error:', error);
        }
    });
});

// Popular Tutorials CAROUSEL
function createVideoCardHTML(video) {
    const { thumb_url, title, 'sub-title': subTitle, duration, author_pic_url, author } = video;

    const videoCard = $('<div>').addClass('card-video-group h-100');
    const thumbnailContainer = $('<div>').addClass('position-relative').appendTo(videoCard);
    $('<img>').attr({
        'src': thumb_url,
        'alt': 'Video Thumbnail'
    }).addClass('card-img-top').appendTo(thumbnailContainer);
    $('<img>').attr({
        'src': 'images/play.png',
        'alt': 'Play Button'
    }).addClass('rounded-circle mr-2 play-overlay position-absolute').appendTo(thumbnailContainer);
    const cardBody = $('<div>').addClass('card-body').appendTo(videoCard);
    $('<h4>').addClass('card-title').text(title).appendTo(cardBody);
    $('<h5>').addClass('card-subtitle mb-2 text-muted').text(subTitle).appendTo(cardBody);
    const avatarContainer = $('<div>').addClass('d-flex align-items-center').appendTo(cardBody);
    $('<img>').attr({
        'src': author_pic_url,
        'alt': 'Avatar'
    }).addClass('rounded-circle mr-2 avatar').appendTo(avatarContainer);
    $('<p>').addClass('mb-0').text(author).appendTo(avatarContainer);
    const metadataContainer = $('<div>').addClass('d-flex justify-content-between mt-2').appendTo(cardBody);
    const starRating = $('<div>').addClass('star-rating').appendTo(metadataContainer);
    $('<img>').attr({
        'src': 'images/star_on.png',
        'alt': 'Star On'
    }).appendTo(starRating);
    $('<p>').addClass('mb-0').text(duration).appendTo(metadataContainer);

    return videoCard;
}


$(document).ready(function () {
    // const carouselInner = $('.carousel-inner');
    // const loader = $('.loader');

    // Function to fetch and render the popular tutorials data
    function fetchAndRenderPopularTutorials() {
        const carouselInner = $('.popular .carousel-inner');
        const loader = $('.popular .loader');

        loader.show();

        $.ajax({
            url: 'https://smileschool-api.hbtn.info/popular-tutorials',
            type: 'GET',
            success: function (videos) {
                loader.hide();
                carouselInner.empty();

                for (let i = 0; i < videos.length; i += 4) {
                    const videoGroup = $('<div>').addClass('carousel-item');
                    if (i === 0) {
                        videoGroup.addClass('active');
                    }
                    const row = $('<div>').addClass('row').appendTo(videoGroup);

                    for (let j = i; j < i + 4 && j < videos.length; j++) {
                        const videoCard = createVideoCardHTML(videos[j]);
                        videoCard.addClass('col-12 col-sm-6 col-lg-3'); // Adjust as needed
                        row.append(videoCard);
                    }

                    carouselInner.append(videoGroup);
                }
            },
            error: function (error) {
                loader.hide();
                console.error('Error:', error);
            }
        });
    }




    // Fetch and render the popular tutorials when the page is ready
    fetchAndRenderPopularTutorials();
});

// Latest Videos CAROUSEL
$(document).ready(function () {
    const carouselInner = $('.latest .carousel-inner');
    const loader = $('.latest .loader');

    loader.show();

    $.ajax({
        url: 'https://smileschool-api.hbtn.info/latest-videos',
        type: 'GET',
        success: function (videos) {
            loader.hide();
            carouselInner.empty();

            for (let i = 0; i < videos.length; i += 4) {
                const videoGroup = $('<div>').addClass('carousel-item');
                if (i === 0) {
                    videoGroup.addClass('active');
                }
                const row = $('<div>').addClass('row').appendTo(videoGroup);

                for (let j = i; j < i + 4 && j < videos.length; j++) {
                    const videoCard = createVideoCardHTML(videos[j]);
                    videoCard.addClass('col-12 col-sm-6 col-lg-3'); // Adjust as needed
                    row.append(videoCard);
                }

                carouselInner.append(videoGroup);
            }
        }
    });
});
