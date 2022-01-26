---
layout: layouts/posts.njk
title: Posts
lang: en-CA
translationKey: posts
eleventyNavigation:
  parent: en-CA
  key: Posts
  order: 3
permalink: "{% if lang != config.defaultLanguage %}/{{ config.languages[lang].slug }}{% endif %}/{{ translations[lang].posts }}/{% if pagination.pageNumber > 0 %}page/{{ pagination.pageNumber | plus: 1 }}/{% endif %}"
pagination:
  data: collections.posts_en-CA
  size: 10
  alias: posts
---
