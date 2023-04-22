<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class DefaultController extends AbstractController
{
    #[Route(path: '/{reactRouting}', name: 'app_default', defaults: ['reactRouting' => null])]
    public function index(): Response
    {
        $name = 'DefaultController';
        return $this->render('default/index.html.twig');
    }
}
