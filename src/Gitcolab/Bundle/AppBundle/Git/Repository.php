<?php

/**
 * This file is part of Gitcolab.
 *
 * (c) Mbechezi mlanawo <mlanawo@mbechezi.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Gitcolab\Bundle\AppBundle\Git;

use Gitonomy\Git\Repository as BaseRepository;

class Repository extends BaseRepository
{
    public function __toString()
    {
        $dir = $this->gitDir;
        return  pathinfo($dir, PATHINFO_FILENAME).'.'. pathinfo($dir, PATHINFO_EXTENSION);
    }
}