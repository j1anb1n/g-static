<div class="pin"
    data-widget="app/haorourou/page/index.js#pin"
    data-pin-id="<%= id %>"
>
    <a href="#" class="img" data-role="link">
        <img data-src="<%= img_url %>" style="height: <%= parseInt(280 * height / width) %>px">
    </a>
    <div class="pic-info clearfix">
        <a href="#" class="desc" data-role="link"><%= description %></a>
        <span
            class="likes<% if (isLike) { %> active<% }%>"
            data-role="like"
        >
            <%= like_count %>
        </span>
    </div>
    <div class="user-info clearfix">
        <div class="row">
            <div class="col-2">
                <img data-src="<%= avatar %>" class="avatar">
                <p>
                    <span class="username"><%= username %></span>
                    <span class="date"><%= date %></span>
                </p>
            </div>
        </div>
    </div>
</div>