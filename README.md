# Recital

***A jQuery plugin for adding a ToC to a Vimeo Video***

## Using the Plugin

### Installation

**Bower**

```
$ bower install jquery-recital --save
```

**NPM**

```
$ npm install jquery-recital --save
```

### Development

```
  <div class="recital">
    <iframe class="recital-sc" src="https://player.vimeo.com/video/134665146?api=1" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

    <ul class="recital-toc">
      <li><a href="#" data-seek-to="11.23">"start": "node index.js"</a></li>
      <li><a href="#" data-seek-to="16.10">process.env.PORT</a></li>
      <li><a href="#" data-seek-to="26.28">heroku create</a></li>
      <li><a href="#" data-seek-to="30.18">git push heroku master</a></li>
      <li><a href="#" data-seek-to="37.21">Node.js app detected</a></li>
      <li><a href="#" data-seek-to="46.18">curl shielded-bastion-9999.herokuapp.com</a></li>
    </ul>
  </div>

  <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
  <script src="jquery.recital.js"></script>
  <script>
    $(function() {
      $('.recital').recital()
    })
  </script>
```


### License

**[This project is licensed under the terms of the MIT license.](http://license-me.herokuapp.com)**
