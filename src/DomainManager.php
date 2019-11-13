<?php

namespace Gitcolab;

use Doctrine\ORM\EntityManagerInterface;

/**
 * @deprecated
 */
class DomainManager
{
    private $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    public function create($entity): void
    {
        $this->entityManager->persist($entity);
        $this->entityManager->flush();
    }

    public function update($entity): void
    {
        $this->entityManager->persist($entity);
        $this->entityManager->flush();
    }

    public function delete($entity): void
    {
        $this->entityManager->remove($entity);
        $this->entityManager->flush();
    }
}
