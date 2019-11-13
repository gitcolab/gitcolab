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

use Gitcolab\Model\Organization;
use Symfony\Contracts\EventDispatcher\Event;

class OrganizationEvent extends Event
{
    private $organization;

    public function __construct($organization)
    {
        $this->organization = $organization;
    }

    public function getOrganization(): Organization
    {
        return $this->organization;
    }
}
