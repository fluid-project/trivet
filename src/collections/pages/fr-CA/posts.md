---
layout: layouts/posts
title: Articles
order: 3
pagination:
  data: collections.posts_fr-CA
  size: 10
  alias: posts
permalink: "{% if locale != defaultLanguage %}/{{ supportedLanguages[locale].slug }}{% endif %}/{% _ locale, 'posts' %}/{% if pagination.pageNumber > 0 %}{% _ locale, 'page' %}/{{ pagination.pageNumber + 1 }}/{% endif %}"
---
