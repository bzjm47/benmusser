
DROP-IN POST PACKAGE

1) Copy the folder 'blog/posts/what-do-you-have-to-say/' (with index.html) into your site.
2) Copy 'blog/images/image1.png' into your site at /blog/images/ (or update the <img src> in index.html to your own path).
3) Open '/blog/posts/posts.json' in your site repo and append this object:

{
  "slug": "what-do-you-have-to-say",
  "title": "What Do You Have To Say?",
  "date": "2025-09-16",
  "excerpt": "In Nov 2024 I scribbled 'AlgoRhythm.' Less than a year later it became 26 songs\u2014because the bottleneck moved from making to meaning.",
  "hero": "/blog/images/image1.png",
  "tags": [
    "ai",
    "process",
    "liner-notes"
  ]
}

4) Deploy. Visit /blog/ to see the new card, and /blog/posts/what-do-you-have-to-say/ for the article.
