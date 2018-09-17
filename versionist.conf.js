'use strict';

const _ = require('lodash')
const semver = require('semver')
const path = require('path')

// const octokit = require('octokit')
module.exports = {
  // Always add the entry to the top of the Changelog, below the header.
  addEntryToChangelog: {
    preset: 'prepend',
    fromLine: 6
  },
  getChangelogDocumentedVersions: {
    preset: 'changelog-headers',
    clean: false
  },
  incrementVersion: (currentVersion, incrementLevel) => {
    const revision = Number(currentVersion[currentVersion.length - 1])
    return currentVersion.slice(0, currentVersion.length - 1) + (revision + 1)
  },
  getCurrentVersion: (documentedVersions, history, callback) => {
    const latestDocumented =  _.trim(_.last(documentedVersions.sort(semver.compare)))
    const metaVersion = _.reduce(history, (acc, commit) => {
      if (!commit.footer['Meta-resin']) {
        return acc
      }
      const version = commit.footer['Meta-resin'] + '+rev0'
      return semver.gt(version, acc) ? version : acc
    }, latestDocumented)

    if (semver.lt(metaVersion, latestDocumented)) {
      throw new Error('Found meta-resin tag which introduces an older version than current')
    }
    return callback(null, metaVersion)
  },
  updateVersion: {
    preset: 'npm',
    clean: false
  }
};