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
    const PROJECT_CREATE = 'gitcolab.project_create';
    const PROJECT_PUSH   = 'gitcolab.project_push';
    const PROJECT_DELETE = 'gitcolab.project_delete';
}