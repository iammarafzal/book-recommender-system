// Single DOMContentLoaded to handle theme + suggestions + view-more

document.addEventListener("DOMContentLoaded", () => {
    // ---- Theme Toggle ----
    const themeSwitch = document.getElementById("theme-switch");
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        document.body.classList.add("dark-theme");
        if (themeSwitch) themeSwitch.checked = true;
    }
    if (themeSwitch) {
        themeSwitch.addEventListener("change", () => {
            const dark = themeSwitch.checked;
            document.body.classList.toggle("dark-theme", dark);
            localStorage.setItem("theme", dark ? "dark" : "light");
        });
    }

    // ---- Search Suggestions (jQuery UI Autocomplete) ----
    const searchInput = document.getElementById("search-box");
    if (searchInput && window.jQuery && jQuery.ui && jQuery.fn.autocomplete) {
        $("#search-box").autocomplete({
            minLength: 2,
            delay: 150,
            source: function(request, response) {
                $.getJSON("/suggest", { term: request.term })
                    .done(data => response(data))
                    .fail(() => response([]));
            },
            select: function(event, ui) {
                // Put selected suggestion into the input and submit the form
                $("#search-box").val(ui.item.value);
                $(".search-form")[0]?.submit();
            }
        });
    }

    // ---- View more cards ----
    const cards = document.querySelectorAll(".card");
    const viewMoreBtn = document.getElementById("view-more");
    let visibleCount = 5, maxCount = 20;

    if (viewMoreBtn) {
        viewMoreBtn.addEventListener("click", () => {
            const nextCount = visibleCount + 5;
            for (let i = visibleCount; i < nextCount && i < cards.length && i < maxCount; i++) {
                cards[i].classList.remove("hidden");
            }
            visibleCount = nextCount;
            if (visibleCount >= cards.length || visibleCount >= maxCount) {
                viewMoreBtn.style.display = "none";
            }
        });
    }
});
