export default ({ app }) => {

    let $el = document.createElement('div')
    $el.id = 'fb-root'
    document.body.appendChild($el)

    window.fbAsyncInit = function() {
        FB.init({
            xfbml            : true,
            version          : 'v8.0'
        });
    };

    (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = 'https://connect.facebook.net/fr_FR/sdk/xfbml.customerchat.js';
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

    
    let $messenger = document.createElement('div')
    $messenger.className = 'fb-customerchat'
    $messenger.setAttribute('page_id', '106261177597488')
    $messenger.setAttribute('theme_color', '#5D13F3')
    $messenger.setAttribute('logged_in_greeting', `Salut ! N'hésite pas à nous poser tes questions ici.`)
    $messenger.setAttribute('logged_out_greeting', `Salut ! N'hésite pas à nous poser tes questions ici.`)
    $messenger.setAttribute('greeting_dialog_display', `fade`)
    $messenger.setAttribute('greeting_dialog_delay', `5`)
    document.body.appendChild($messenger)
}