---
layout: layouts/posts.njk
title: Articles
lang: fr-CA
translationKey: posts
eleventyNavigation:
  parent: fr-CA
  key: Articles
  order: 3
permalink: "{% if lang != config.defaultLanguage %}/{{ config.languages[lang].slug }}{% endif %}/{{ translations[lang].posts }}/{% if pagination.pageNumber > 0 %}page/{{ pagination.pageNumber | plus: 1 }}/{% endif %}"
pagination:
  data: collections.posts_fr-CA
  size: 10
  alias: posts
---
