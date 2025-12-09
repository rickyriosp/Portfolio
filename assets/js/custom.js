/*----------- Blog Posts -----------*/ 

let getBlogPosts = async function(qty) {
    localUrl = `https://localhost:5001/api/Post?postQty=${qty}`;
    url = `https://blog.riosr.com/Api/Post?postQty=${qty}`;
    let response = await fetch(url);

    if (response.ok) { // if HTTP-status is 200-299
        // get the response body (the method explained below)
        let json = await response.json();

        let container = document.getElementById("blog-posts-container");
        json.forEach(element => {
            let htmlString =
                `
                <!-- col -->
                <div class="col-md-6 col-xl-4 mb-5">
                    <!-- card -->
                    <div class="card blog-post-card">
                        <img class="card-img-top" src="data:${element.contentType};base64,${element.imageData}">
                        <div class="card-body">
                            <h5 class="card-title"><a class="theme-link" href="https://blog.riosr.com/BlogPosts/UrlFriendly/${element.slug}" target="_blank">${element.title}</a></h5>
                            <p class="card-text">${element.abstract}</p>
                            <p class="mb-0"><a class="text-link" href="https://blog.riosr.com/BlogPosts/UrlFriendly/${element.slug}" target="_blank">Read more &rarr;</a></p>
                        </div>
                        <div class="card-footer">
                            <small class="text-muted">Published on ${(new Date(element.created)).toLocaleDateString('en-US')}</small>
                        </div>
                    </div>
                </div>
                `;

            container.append(stringToHTML(htmlString));
        });
    } else {
        alert("HTTP-Error: " + response.status);
    }
}

let stringToHTML = function(str) {
    var parser = new DOMParser();
    var doc = parser.parseFromString(str, 'text/html');

    return doc.getElementsByClassName('col-md-6')[0];
};

getBlogPosts(3);


/*----------- Contact -----------*/

$('.contact-form').on('submit', function(event) {
    var form = $(this);
    var submitBtn = form.find('#contact-submit');
    var submitBtnText = submitBtn.text();
    var feedbackEl = form.find('.contact-feedback');
    event.preventDefault();
    // Waiting for the response from the server
    submitBtn.html('Wait...').addClass('wait').prop('disabled', true);
    setTimeout(function() {
        // Posts the Form's data to the server using Ajax
        $.ajax({
                url: form.attr('action'),
                type: 'POST',
                data: form.serialize(),
            })
            // Getting a response from the server
            .done(function(response) {
                // If the PHP file succeed sending the message
                if (response == 'success') {
                    // Feedback to the user
                    submitBtn.removeClass('wait').html('Success').addClass('success');
                    feedbackEl.addClass('success').html('Thank you, your message has been sent.').fadeIn(200);
                    setTimeout(function() {
                        submitBtn.html(submitBtnText).removeClass('success').prop('disabled', false);
                        feedbackEl.fadeOut(200).removeClass('success').html('');
                    }, 6000);
                    // Clears the Form
                    form[0].reset();
                    // If something is wrong
                } else {
                    // Feedback to the user
                    console.log(response);
                    submitBtn.removeClass('wait').html('Error').addClass('error');
                    feedbackEl.addClass('error').html('Server error! Please check your browser console log for more details.').fadeIn(200);
                    setTimeout(function() {
                        submitBtn.html(submitBtnText).removeClass('error').prop('disabled', false);
                        feedbackEl.fadeOut(200).removeClass('error').html('');
                    }, 6000);
                }
            });
    }, 1000);
});


/*----------- View Resume Button -----------*/

document.getElementById("viewResumeButton").addEventListener("click", function () {
    // Select the hidden resume section
    const resumeHidden = document.getElementById("resume-hidden");
    // Select the visible main-wrapper
    const mainWrapper = document.querySelector(".main-wrapper:not(#resume-hidden)");

    // Make the hidden resume section visible
    resumeHidden.style.display = "block";
    // Hide the other main-wrapper
    mainWrapper.style.display = "none";

    // Redirect to index.html with the target section
    window.location.href = `#resume`;

    // Scroll to the top of the resume section
    window.scrollTo({
        top: resumeHidden.offsetTop,
        behavior: "smooth"
    });
});


/*----------- Navbar Link Handling on Resume Page -----------*/

document.querySelectorAll('.navbar-nav a').forEach(link => {
    link.addEventListener('click', function (event) {
        // Check if the current URL is index.html#resume
        if (window.location.href.includes('resume')) {
            // Prevent default navigation behavior
            event.preventDefault();

            // Get the target section from the clicked link's href
            const targetSection = link.getAttribute('href');

            // Select the hidden resume section
            const resumeHidden = document.getElementById("resume-hidden");
            // Select the visible main-wrapper
            const mainWrapper = document.querySelector(".main-wrapper:not(#resume-hidden)");

            // Make the hidden resume section visible
            resumeHidden.style.display = "none";
            // Hide the other main-wrapper
            mainWrapper.style.display = "block";

            // Redirect to index.html with the target section
            window.location.href = `${targetSection}`;
        }
    });
});