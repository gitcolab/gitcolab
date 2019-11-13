<?php

/**
 * This file is part of Gitcolab.
 *
 * (c) Mbechezi mlanawo <mlanawo.mbechezi@kemeter.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Gitcolab;

final class Events
{
    const PROJECT_PRE_CREATE = 'gitcolab.project.pre_create';
    const PROJECT_CREATE = 'gitcolab.project.post_create';
    const PROJECT_PUSH = 'gitcolab.project_push';
    const PROJECT_DELETE = 'gitcolab.project_delete';

    const ORGANIZATION_PRE_CREATE = 'gitcolab.organization.pre_create';
    const ORGANIZATION_CREATE = 'gitcolab.organization.post_create';

    const ISSUE_CREATE = 'gitcolab.issue.post_create';
    const ISSUE_PR_CREATE = 'gitcolab.issue.pre_create';
    const PR_CREATE = 'gitcolab.pullrequest.post_create';
}
