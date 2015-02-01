<?php

/**
 * This file is part of Gitcolab.
 *
 * (c) Mbechezi mlanawo <mlanawo@mbechezi.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Gitcolab\Bundle\AppBundle\Controller;

use Gitonomy\Git\Repository;
use Symfony\Component\HttpFoundation\Request;
use FOS\RestBundle\View\View;
use Gitcolab\Bundle\AppBundle\Form\Type\ProjectType;
use Gitcolab\Bundle\AppBundle\Model\Project;
use Gitcolab\Bundle\AppBundle\GitcolabEvents;
use Gitcolab\Bundle\AppBundle\Event\ProjectEvent;

class ProjectController extends Controller
{
    public function createAction(Request $request)
    {
        $project = new Project();

        $form = $this->createForm(new ProjectType(), $project, array(
            'user_id' => $this->getUser()
        ));

        if ($form->handleRequest($request)->isValid()) {

            $this->persistAndFlush($project);
            $project->addUser($this->getUser(), 'ROLE_ADMIN');
            $this->persistAndFlush($project);

            $this->dispatch(GitcolabEvents::PROJECT_CREATE, new ProjectEvent($project, $this->getUser()));

            return $this->redirectToRoute('dashboard');
        }

        $view = View::create();
        $view->setData(array(
            'form' => $form->createView()
        ));
        $view->setTemplate('GitcolabAppBundle:Project:create.html.twig');

        return $this->handleView($view);
    }

    public function showAction(Request $request, $slug)
    {
        $view = View::create();

        $slugParameter = explode('/', $slug);
        $project = $this->getRepository('Project')->findProject($slugParameter[0], $slugParameter[1]);

        if (!$project) {
            throw $this->createNotFoundException();
        }

        $data = array(
            'project' => $project,
            'slug' => $slug,
            'gitcolab_url' => str_replace('http://', '', $this->container->getParameter('gitcolab.url'))
        );
        $path = '';

        $repository = $project->getRepository();
        $refs       = $repository->getReferences();

        $revision = $repository->getRevision($project->getDefaultBranch());

        try {
            $commit = $revision->getCommit();
            $tree = $commit->getTree();
            if (strlen($path) > 0 && '/' === substr($path, 0, 1)) {
                $path = substr($path, 1);
            }

            try {
                $element = $tree->resolvePath($path);
            } catch (\InvalidArgumentException $e) {
                throw $this->createNotFoundException($e->getMessage());
            }

            $readme =

            $data = array_merge($data, array(
                'tree' => $tree,
                'revision' => $revision,
                'path' => $path,
                'readme' => $this->getReadme($repository, $tree, $path)
            ));



        } catch (\InvalidArgumentException $e) {
            $data['revision'] =  false;
        }

        $view
            ->setData($data)
            ->setTemplate('GitcolabAppBundle:Project:show.html.twig');

        return $this->handleView($view);
    }

    public function getReadme(Repository $repository, $tree, $path)
    {
        foreach ($tree->getEntries() as $name =>  $file) {

            if (preg_match('/^readme*/i', $name)) {
                return array(
                    'filename' => $name,
                    'content'  => (new \Parsedown())->text($tree->resolvePath($name)->getContent())
                );
            }
        }
        return array();
    }
}
