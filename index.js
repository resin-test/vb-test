#!/usr/bin/env node

'use strict';

const capitano = require('capitano')
const {
  storeGithub,
  publishGithub,
  cleanGithub
} = require('./lib/github')

const {
  storeDockerHub
} = require('./lib/dockerhub')

const {
  storeNpm,
  publishNpm,
  cleanNpm
} = require('./lib/npm')

capitano.command({
  signature: 'store github <files...>',
  description: 'Create a branch and commit the files on top of that',
  options: [
  {
    signature: 'base_branch',
    parameter: 'base_branch',
    alias: ['b'],
    required: true,
    description: 'Branch name',
  }, {
    signature: 'base_repo',
    parameter: 'base_repo',
    alias: ['r'],
    required: true,
    description: 'Repository name',
  }, {
    signature: 'base_owner',
    parameter: 'base_owner',
    alias: ['o'],
    required: true,
    description: 'Owner name',
  },
  {
    signature: 'head_branch',
    parameter: 'head_branch',
    required: true,
    description: 'Branch name',
  }, {
    signature: 'head_repo',
    parameter: 'head_repo',
    required: true,
    description: 'Repository name',
  }, {
    signature: 'head_owner',
    parameter: 'head_owner',
    required: true,
    description: 'Owner name',
  }, {
    signature: 'version',
    parameter: 'version',
    alias: ['v'],
    required: true,
    description: 'Version',
  }],
  action: storeGithub
})

capitano.command({
  signature: 'publish github',
  description: 'Publish the build branch on top of master',
  options: [{
    signature: 'branch',
    parameter: 'branch',
    alias: ['b'],
    required: true,
    description: 'Branch name',
  }, {
    signature: 'repo',
    parameter: 'repo',
    alias: ['r'],
    required: true,
    description: 'Repository name',
  }, {
    signature: 'owner',
    parameter: 'owner',
    alias: ['o'],
    required: true,
    description: 'Owner name',
  }, {
    signature: 'version',
    parameter: 'version',
    alias: ['v'],
    required: true,
    description: 'Version',
  }],
  action: publishGithub
})

capitano.command({
  signature: 'clean github <branch>',
  description: 'Deletes <branch> and all other build branches from the same PR',
  options: [{
    signature: 'repo',
    parameter: 'repo',
    alias: ['r'],
    required: true,
    description: 'Repository name',
  }, {
    signature: 'owner',
    parameter: 'owner',
    alias: ['o'],
    required: true,
    description: 'Owner name',
  }],
  action: cleanGithub
})

capitano.command({
  signature: 'store npm <path>',
  description: 'Publish npm package. Will be tagged as ${branch}-${sha}',
  options: [{
    signature: 'sha',
    parameter: 'sha',
    alias: ['s'],
    required: true,
    description: 'Commit SHA',
  }, {
    signature: 'branch',
    parameter: 'branch',
    alias: ['b'],
    required: true,
    description: 'Branch name',
  }, {
    signature: 'version',
    parameter: 'version',
    alias: ['v'],
    required: true,
    description: 'Version',
  }, {
    signature: 'private',
    boolean: true,
    description: 'Set the NPM repo to private. Defaults to false'
  }],
  action: storeNpm
})

capitano.command({
  signature: 'publish npm <path>',
  description: 'Publish package to npm tagging it as latest',
  options: [{
    signature: 'sha',
    parameter: 'sha',
    alias: ['s'],
    required: true,
    description: 'Commit SHA',
  }, {
    signature: 'branch',
    parameter: 'branch',
    alias: ['b'],
    required: true,
    description: 'Branch name',
  }, {
    signature: 'version',
    parameter: 'version',
    alias: ['v'],
    required: true,
    description: 'Version',
  }, {
    signature: 'private',
    boolean: true,
    description: 'Set the NPM repo to private. Defaults to false'
  }],
  action: publishNpm
})

capitano.command({
  signature: 'clean npm <path> <branch>',
  description: 'Removes tags associated to build branch from the package in the supplied path.',
  options: [],
  action: cleanNpm
})

capitano.command({
  signature: 'docker <path> <dockerfile> <repo>',
  description: 'Build an image and push it to dockerhub',
  options: [{
    signature: 'sha',
    parameter: 'sha',
    alias: ['s'],
    required: true,
    description: 'Commit SHA',
  }, {
    signature: 'branch',
    parameter: 'branch',
    alias: ['b'],
    required: true,
    description: 'Branch name',
  }, {
    signature: 'username',
    parameter: 'username',
    alias: ['u'],
    required: true,
    description: 'DockerHub username',
  }, {
    signature: 'password',
    parameter: 'password',
    alias: ['p'],
    required: true,
    description: 'DockerHub password',
  }, {
    signature: 'publish',
    boolean: true,
    required: false,
    description: 'Publish the image to dockerhub',
  }],
  action: storeDockerHub
})

capitano.run(process.argv, err => {
  if (err != null) {
    throw err
  }
})
