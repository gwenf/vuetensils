# VImg

Drop in replacement for the HTML `<img>` tag which supports lazy-loading. Improves load times by waiting for the image to scroll into view before actually downloading it.

Note: This component uses [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) which is not supported by Internet Explorer.

This site has the following global CSS:

```css
img {
  max-width: 100%;
  height: auto;
}
```

## Default use

```vue live
<template>
  <VImg src="https://source.unsplash.com/random/900x600" />
</template>
```

Pass in the image dimensions to avoid the page jumping when the image loads

```vue live
<template>
  <VImg
    src="https://source.unsplash.com/random/900x550"
    width="900"
    height="550"
  />
</template>
```

## Colored Placeholder

```vue live
<template>
  <VImg
    src="https://source.unsplash.com/random/1000x550"
    width="1000"
    height="550"
    background="#ddd"
  />
</template>
```

## Blurred Thumbnail Placeholder

```vue live
<template>
  <VImg
    :src="`https://images.unsplash.com/photo-1546094324-7fd2718befe3?w=1080`"
    width="1080"
    height="864"
    placeholder="https://images.unsplash.com/photo-1546094324-7fd2718befe3?w=30"
  />
</template>
```

## Misc

Don't forget all the other best practices such as `srcset` attribute and `alt` text

```vue live
<template>
  <VImg
    :src="`https://images.unsplash.com/photo-1455656678494-4d1b5f3e7ad4?w=1080`"
    width="900"
    height="600"
    placeholder="https://images.unsplash.com/photo-1455656678494-4d1b5f3e7ad4?w=30"
    srcset="https://images.unsplash.com/photo-1455656678494-4d1b5f3e7ad4?w=320 320w,
      https://images.unsplash.com/photo-1455656678494-4d1b5f3e7ad4?w=480 480w,
      https://images.unsplash.com/photo-1455656678494-4d1b5f3e7ad4?w=800 800w"
    sizes="(max-width: 320px) 280px,
      (max-width: 480px) 440px,
      (max-width: 800px) 760px,
      1080px"
    alt="Beautiful forest"
  />
</template>
```

## Custom Classes

This component can accept a `classes` prop to cusomize the output HTML classes:

```
:classes="{ root: 'root-class', placeholder: 'placeholder-class', img: 'img-class' }"
```