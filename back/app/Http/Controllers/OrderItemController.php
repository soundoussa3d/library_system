<?php

namespace App\Http\Controllers;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use App\Http\Requests\OrderItemRequest;
class OrderItemController extends Controller
{
    public function index()
    {
        $orderItems = OrderItem::all();
        return response()->json($orderItems);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(OrderItemRequest $request)
    {
        

        $orderItem = OrderItem::create($request->all());
        return response()->json($orderItem, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $orderItem = OrderItem::findOrFail($id);
        return response()->json($orderItem);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(OrderItemRequest $request, $id)
    {
       

        $orderItem = OrderItem::findOrFail($id);
        $orderItem->update($request->all());
        return response()->json($orderItem);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $orderItem = OrderItem::findOrFail($id);
        $orderItem->delete();
        return response()->json(null, 204);
    }
}
