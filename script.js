const joke_btn = document.getElementsByClassName('api');
const joke_content = document.getElementsByClassName('joke-content');
console.log(
  '🚀 ~ file: index.html ~ line 77 ~ constjoke_fun= ~ joke_content',
  joke_content
);
const joke_content_punchline = document.getElementsByClassName(
  'joke-content-punchline'
);
const bars_anime = document.getElementById('bars');
const voice_input_parent = document.getElementsByClassName('voice-content');
const voice_input = document.getElementsByClassName('voice-rec');
const voice_joke = document.getElementsByClassName('voice-joke');
const voice_answer = document.getElementsByClassName('voice-answer');
console.log('🚀 ~ file: index.html ~ line 186 ~ voice_input', voice_input);
let punchline;
const spinner = document.getElementsByClassName('spinner');
const get_joke = async () => {
  return await fetch(
    'https://official-joke-api.appspot.com/jokes/programming/random'
  )
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log('err api', err);
      return err;
    });
};
const joke_fun = async () => {
  console.log('clicked');
  joke_content_punchline[0].style.display = 'none';
  const api_call = await get_joke();
  console.log('api_call', api_call);
  if (api_call[0]) {
    const result = {
      setup: api_call[0].setup,
      punchline: api_call[0].punchline
    };
    console.log({ result });
    joke_content_punchline[0].innerText = "<< press 'p' for punchline >>";
    joke_content_punchline[0].style.display = 'inline';
    joke_content[0].innerText = `${result.setup}`;
    punchline = result.punchline;
    window.addEventListener(
      'keydown',
      (event) => {
        if (event.defaultPrevented) {
          return; // Do nothing if the event was already processed
        }

        switch (event.key) {
          case 'p':
            console.log('p'); // IE/Edge specific value
            joke_content_punchline[0].innerText = punchline;
            break;
          case 'v':
            console.log('v'); // IE/Edge specific value
            // Do something for "down arrow" key press.
            break;
          default:
            return; // Quit when this doesn't handle the key event.
        }

        // Cancel the default action to avoid it being handled twice
        event.preventDefault();
      },
      true
    );
  } else {
    console.log('joke_content', joke_content);
    joke_content[0].innerText = `Oops! we are having trouble connecting to our joke chef. Please try again later`;
  }
};
const cleanup_fun = () => {
  joke_content_punchline[0].innerText = '';
  joke_content[0].innerText = '';
  bars_anime.style.display = 'flex';
};
const utter_word = () => {
  const recognition = new webkitSpeechRecognition();
  console.log('starting');
  recognition.lang = 'en-US';
  recognition.onresult = async (event) => {
    console.log('event', event);
    bars_anime.style.display = 'none';
    const voice_result = event.results[0][0].transcript;
    voice_input[0].innerHTML = voice_result;
    voice_input_parent[0].style.display = 'block';
    if (
      voice_result == 'tell me a joke' ||
      voice_result == 'tell me joke' ||
      voice_result == 'tell joke' ||
      voice_result == 'joke'
    ) {
      console.log('yep');

      const api_call = await get_joke();
      console.log('api_call', api_call);
      if (api_call[0]) {
        const result = {
          setup: api_call[0].setup,
          punchline: api_call[0].punchline
        };
        console.log({ result });
        voice_joke[0].innerText = `${result.setup} ${result.punchline}`;
        voice_answer[0].style.display = 'block';
      } else {
        voice_joke[0].innerText = `Oops! we are having trouble connecting to our joke chef. Please try again later`;
        voice_answer[0].style.display = 'block';
      }
      let utterance = new SpeechSynthesisUtterance(
        `${voice_joke[0].innerText}`
      );
      speechSynthesis.speak(utterance);
    }
    console.log('result', Array.isArray(voice_result));
    console.log('result', voice_result);
  };
  recognition.start();
};
