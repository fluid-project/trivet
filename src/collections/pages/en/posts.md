---
layout: layouts/posts
title: Posts
order: 3
permalink: "/posts/{% if pagination.pageNumber > 0 %}page/{{ pagination.pageNumber + 1 }}/{% endif %}"
pagination:
  data: collections.posts_en
  size: 10
  alias: posts
---
