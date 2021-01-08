---
layout: layouts/posts.njk
title: Posts
eleventyNavigation:
  key: Posts
  order: 2
permalink: "/posts/{% if pagination.pageNumber > 0 %}page/{{ pagination.pageNumber + 1 }}/{% endif %}"
pagination:
  data: collections.posts
  size: 10
  alias: posts
---
