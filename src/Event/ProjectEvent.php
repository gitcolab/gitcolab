<?php

/**
 * This file is part of Gitcolab.
 *
 * (c) Mbechezi mlanawo <mlanawo.mbechezi@kemeter.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Gitcolab\Event;

use Gitcolab\Model\Project;
use Symfony\Contracts\EventDispatcher\Event;

class ProjectEvent extends Event
{
    private $project;

    public function __construct($project)
    {
        $this->project = $project;
    }

    public function getProject(): Project
    {
        return $this->project;
    }
}

