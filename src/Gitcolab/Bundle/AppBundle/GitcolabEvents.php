<?php

/**
 * This file is part of Gitcolab.
 *
 * (c) Mbechezi mlanawo <mlanawo@mbechezi.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Gitcolab\Bundle\AppBundle;

final class GitcolabEvents
{
    const PROJECT_PRE_CREATE = 'gitcolab.project.pre_create';
    const PROJECT_CREATE = 'gitcolab.project.post_create';
    const PROJECT_PUSH   = 'gitcolab.project_push';
    const PROJECT_DELETE = 'gitcolab.project_delete';

    const ORGANIZATION_PRE_CREATE = 'gitcolab.organization.pre_create';
    const ORGANIZATION_CREATE = 'gitcolab.organization.post_create';
}