<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Video;

/**
 * Controller class to handle video API calls
 */
class VideoController extends AbstractController
{
    /**
     * Return list of videos
     *
     * @param EntityManagerInterface $entityManager
     * @return JsonResponse
     */
    #[Route('/api/video-links', name: 'video_list', methods: ['GET'])]
    public function list(EntityManagerInterface $entityManager): JsonResponse
    {
        $repository = $entityManager->getRepository(Video::class);

        $videos = $repository->findAll();
        
        return $this->json($videos);
    }

    /**
     * Add new video
     *
     * @param EntityManagerInterface $entityManager
     * @param Request $request
     * @return JsonResponse
     */
    #[Route('/api/video-links', name: 'video_add', methods: ['POST'])]
    public function add(EntityManagerInterface $entityManager, Request $request): JsonResponse
    {
        $video = new Video();
        $video->setUrl($request->get('url'));
        $video->setTitle($request->get('title'));
        $video->setDescription($request->get('description'));

        $entityManager->persist($video);
        $entityManager->flush();
        
        return $this->json($video);
    }

    /**
     * Show video by id
     *
     * @param EntityManagerInterface $entityManager
     * @param int $id
     * @return JsonResponse
     */
    #[Route('/api/video-links/{id}', name: 'video_show')]
    public function show(EntityManagerInterface $entityManager, int $id): JsonResponse
    {
        $repository = $entityManager->getRepository(Video::class);
        
        $video = $repository->find($id);
                
        return $this->json($video);
    }
}
