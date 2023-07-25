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
// Create the HTML structure for a video card
function createVideoCardHTML(video) {
    const { thumb_url, title, 'sub-title': subTitle, duration, 'published-at': publishedAt, views } = video;
    const videoCard = $('<div>').addClass('carousel-item');
    const row = $('<div>').addClass('row mx-auto align-items-center').appendTo(videoCard);
    const imgCol = $('<div>').addClass('col-12 col-sm-4 col-lg-4 offset-lg-1 text-center').appendTo(row);
    const img = $('<img>').attr({
        'src': thumb_url,
        'alt': 'Video Thumbnail'
    }).addClass('d-block align-self-center').appendTo(imgCol);
    const textCol = $('<div>').addClass('col-12 col-sm-7 col-lg-6 offset-lg-0').appendTo(row);
    const videoTitle = $('<h4>').addClass('video-title').text(title).appendTo(textCol);
    const videoInfo = $('<p>').addClass('video-info').text(subTitle).appendTo(textCol);
    const videoMetadata = $('<div>').addClass('video-metadata').appendTo(textCol);
    $('<span>').addClass('video-metadata-item').text(duration).appendTo(videoMetadata);
    $('<span>').addClass('video-metadata-item').text(publishedAt).appendTo(videoMetadata);
    $('<span>').addClass('video-metadata-item').text(views).appendTo(videoMetadata);

    return videoCard;
}

$(document).ready(function () {
    const carouselInner = $('.carousel-inner');
    const loader = $('.loader');

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

                $.each(videos, function (index, video) {
                    // Create the video card HTML and append it to the carousel container
                    const videoCard = createVideoCardHTML(video);
                    if (index === 0) {
                        videoCard.addClass('active');
                    }
                    carouselInner.append(videoCard);
                });
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