---
layout: layouts/posts
title: Articles
order: 3
permalink: "/fr/articles/{% if pagination.pageNumber > 0 %}page/{{ pagination.pageNumber + 1 }}/{% endif %}"
pagination:
  data: collections.posts_fr
  size: 10
  alias: posts
---
