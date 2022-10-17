# Using Notavel Code Editor:

## Using from web source:
It is recommended to use the script at the bottom of your body tag, or you can use the <strong>defer</strong> attribute in script tag
```html
<body>
    ...
    <script defer type="module">
      import {initNotavel} from 'notavel';
      initNotavel();
    </script>
<body>
```

## Basic use:

In your body tag:

```html
<code-editor>
    your.init(code);
</code-editor>
```

## Setting language:
In your body tag:

```html
<code-editor lang='css'>
    code-editor
    {
        background: blue;
    }
</code-editor>
```
